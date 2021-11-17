import React, { useState, useReducer, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { RouteComponentProps } from 'react-router';
import { readTeamUsers } from '@apis/users';
import UserState from '@stores/user';

import ChatTemplate from '@templates/ChatTemplate';
import { UserType, ChatModeType } from '@components/Chat/dataStructure';

type InviteUsersAction = { type: 'ADD'; newUser: UserType } | { type: 'DELETE'; id: number };

const inviteUsersReducer = (inviteUsers: UserType[], action: InviteUsersAction): UserType[] => {
	switch (action.type) {
		case 'ADD':
			return [...inviteUsers, action.newUser];
		case 'DELETE':
			return [...inviteUsers.filter((users) => users.user_id !== action.id)];
		default:
			throw new Error();
	}
};

interface MatchParams {
	teamId: string;
}

type Props = RouteComponentProps<MatchParams>;

const ChatPage: React.FC<Props> = ({ match }) => {
	const userId = useRecoilValue(UserState).id;
	const [chatMode, setChatMode] = useState<ChatModeType>('none');
	const [teamUsers, setTeamUsers] = useState<UserType[]>([]);
	const [inviteUsers, dispatchInviteUsers] = useReducer(inviteUsersReducer, []);

	const addInviteUser = (newUser: UserType) => dispatchInviteUsers({ type: 'ADD', newUser });
	const deleteInviteUser = (id: number) => dispatchInviteUsers({ type: 'DELETE', id });

	const setChatModeToNone = () => setChatMode('none');
	const setChatModeToCreate = () => setChatMode('create');
	const setChatModeToChat = () => setChatMode('chat');

	const getTeamUsers = async () => {
		const usersData = await readTeamUsers(Number(match.params.teamId));
		const teamUsersInfo = usersData
			.filter(({ user }: any) => user.user_id !== userId)
			.map(({ user }: any) => {
				return { user_id: user.user_id, user_name: user.user_name, user_email: user.user_email };
			});
		setTeamUsers(teamUsersInfo);
	};

	useEffect(() => {
		getTeamUsers();
	}, []);

	return (
		<ChatTemplate
			chatMode={chatMode}
			teamUsers={teamUsers}
			inviteUsers={inviteUsers}
			setChatModeToNone={setChatModeToNone}
			setChatModeToCreate={setChatModeToCreate}
			setChatModeToChat={setChatModeToChat}
			addInviteUser={addInviteUser}
			deleteInviteUser={deleteInviteUser}
		/>
	);
};

export default ChatPage;
