import React, { useEffect, useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useRecoilValue } from 'recoil';
import { SocketContext } from '@utils/socketContext';
import userState from '@stores/user';
import { teamUsersSelector } from '@stores/team';
import { TeamUserType, UserIdType } from '@src/types/team';
import UsersTemplate from '@templates/UsersTemplate';

interface MatchParams {
	teamId: string;
}

type Props = RouteComponentProps<MatchParams>;

const UsersPage: React.FC<Props> = ({ match }) => {
	const socketRef = useContext(SocketContext);
	const [onlineUsers, setOnlineUsers] = useState<UserIdType[]>([]);

	// team 이름, 설명
	const teamId = Number(match.params.teamId);

	const [filteredUsers, setFilteredUsers] = useState<TeamUserType[]>([]); // 검색바로 검색한 유저 리스트
	const myInfo = useRecoilValue(userState); // 본인 정보
	const [isAdmin, setIsAdmin] = useState(false); // 본인이 팀의 admin인지

	const teamUsers = useRecoilValue(teamUsersSelector(teamId));
	const teamUserList: TeamUserType[] = Object.values(teamUsers);

	// admin인지
	const checkAdmin = () => teamUserList.find((user) => user.userId === myInfo.id)?.role === '관리자' || false;

	// 검색바에 입력하면 전체 유저에서 filtering
	const search = (value: any) =>
		teamUserList.filter((user) => user.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);

	// 검색바 입력 시 이벤트
	const handleInput = (e: any) => setFilteredUsers(search(e.target.value));

	useEffect(() => {
		if (myInfo.id !== -1) setIsAdmin(checkAdmin());
	}, [myInfo]);

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
			onlineUsers={onlineUsers}
			isAdmin={isAdmin}
			filteredUsers={filteredUsers}
			handleInput={handleInput}
		/>
	);
};

export default UsersPage;
