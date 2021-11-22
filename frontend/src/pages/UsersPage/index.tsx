import React, { useEffect, useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useRecoilValue } from 'recoil';
import { Role } from '@utils/constants';
import { readTeamInfo, readTeamUsers } from '@apis/users';
import { SocketContext } from '@utils/socketContext';
import userState from '@stores/user';
import UsersTemplate from '@templates/UsersTemplate';

interface MatchParams {
	teamId: string;
}

interface UserIdType {
	userId: number;
}

interface User {
	id: number;
	name: string;
	color: number;
}

type Props = RouteComponentProps<MatchParams>;

const UsersPage: React.FC<Props> = ({ match }) => {
	const socketRef = useContext(SocketContext);
	const [onlineUsers, setOnlineUsers] = useState<UserIdType[]>([]);

	const [mode, setMode] = useState(''); // modal 종류
	const [isModalOpen, setIsModalOpen] = useState(false); // modal open 여부
	// handle modal
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const changeMode = (newMode: string) => setMode(newMode);

	// team 이름, 설명
	const [teamInfo, setTeamInfo] = useState({});
	const teamId = Number(match.params.teamId);

	const [users, setUsers] = useState<User[]>([]); // 팀의 전체 유저리스트
	const [filteredUsers, setFilteredUsers] = useState(users); // 검색바로 검색한 유저 리스트
	const user = useRecoilValue(userState); // 본인 정보
	const [isAdmin, setIsAdmin] = useState(false); // 본인이 팀의 admin인지

	const deleteUserById = (id: number) => {
		const newUsers = [...users.filter((elem) => elem.id !== id)];
		setUsers(newUsers);
		setFilteredUsers(newUsers);
	};

	// 팀의 유저 전체 가져와서 users, filteredUsers, isAdmin 세팅
	const getUsers = async () => {
		const result = await readTeamUsers(teamId);
		const resultArr: any = [];
		result.forEach((e: any) => {
			if (e.state)
				resultArr.push({
					id: e.user.user_id,
					name: e.user.user_name,
					color: e.user.user_color,
					role: Role[e.role],
					state: e.state,
				});
		});
		setUsers(resultArr);
		setFilteredUsers(resultArr);
		setIsAdmin(checkAdmin(resultArr));
	};

	// 팀 id로 팀정보 get
	const getTeam = async () => {
		const result = await readTeamInfo(teamId);
		setTeamInfo(result);
	};

	// admin인지
	const checkAdmin = (resultArr: any[]) =>
		resultArr.filter((e: any) => e.name === user.name)[0]?.role === '관리자' || false;

	// 검색바에 입력하면 전체 유저에서 filtering
	const search = (e: any) =>
		users.filter((elem: User) => elem.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);

	// 검색바 입력 시 이벤트
	const handleInput = (e: any) => {
		e.preventDefault();
		setFilteredUsers(search(e));
	};

	// 모달을 여는 버튼을 눌렀을 때
	const onBtnClick = (mode: string) => {
		changeMode(mode);
		openModal();
	};

	useEffect(() => {
		if (user.id !== -1) {
			getUsers();
			getTeam();
		}
	}, [teamId, user]);

	useEffect(() => {
		if (socketRef.current) {
			socketRef.current.on('online users', (data: { onlineUsers: UserIdType[] }) => {
				setOnlineUsers(data.onlineUsers);
			});
			socketRef.current.emit('enter users room');
		}
		return () => {
			socketRef.current.emit('leave users room');
			socketRef.current.off('online users');
		};
	}, [socketRef.current]);

	return (
		<UsersTemplate
			teamId={teamId}
			teamInfo={teamInfo}
			onlineUsers={onlineUsers}
			mode={mode}
			isAdmin={isAdmin}
			closeModal={closeModal}
			isModalOpen={isModalOpen}
			getTeam={getTeam}
			filteredUsers={filteredUsers}
			handleInput={handleInput}
			onBtnClick={onBtnClick}
			deleteUserById={deleteUserById}
		/>
	);
};

export default UsersPage;
