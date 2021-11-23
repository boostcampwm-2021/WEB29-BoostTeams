import React, { useEffect, useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { SocketContext } from '@utils/socketContext';
import { readTeamInfo } from '@apis/users';
import userState from '@stores/user';
import { teamUsersSelector, teamUsersTrigger } from '@stores/team';
import { TeamUserType, UserIdType } from '@src/types/team';

import UsersTemplate from '@templates/UsersTemplate';

interface MatchParams {
	teamId: string;
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

	const [filteredUsers, setFilteredUsers] = useState<TeamUserType[]>([]); // 검색바로 검색한 유저 리스트
	const myInfo = useRecoilValue(userState); // 본인 정보
	const [isAdmin, setIsAdmin] = useState(false); // 본인이 팀의 admin인지

	const setTeamUsersTrigger = useSetRecoilState(teamUsersTrigger);
	const teamUsers = useRecoilValue(teamUsersSelector(teamId));
	const teamUserList: TeamUserType[] = Object.values(teamUsers);

	const deleteUserById = () => setTeamUsersTrigger((trigger) => trigger + 1);

	// 팀 id로 팀정보 get
	const getTeam = async () => {
		const result = await readTeamInfo(teamId);
		setTeamInfo(result);
	};

	// admin인지
	const checkAdmin = () => teamUserList.find((user) => user.userId === myInfo.id)?.role === '관리자' || false;

	// 검색바에 입력하면 전체 유저에서 filtering
	const search = (e: any) =>
		teamUserList.filter((user) => user.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);

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
		if (myInfo.id !== -1) {
			setIsAdmin(checkAdmin());
			getTeam();
		}
	}, [teamId, myInfo]);

	useEffect(() => {
		setFilteredUsers(teamUserList);
	}, [teamUsers]);

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
