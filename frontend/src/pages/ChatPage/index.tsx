import React, { useState, useReducer, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useResetRecoilState } from 'recoil';

import { UserIdType, ChatModeType } from '@src/types/chat';
import { currentChatRoomState } from '@stores/chat';

import ChatTemplate from '@templates/ChatTemplate';

type InviteUsersAction = { type: 'ADD'; newUser: UserIdType } | { type: 'DELETE'; id: number } | { type: 'INIT' };

const inviteUsersReducer = (inviteUsers: UserIdType[], action: InviteUsersAction): UserIdType[] => {
	switch (action.type) {
		case 'ADD':
			return [...inviteUsers, action.newUser];
		case 'DELETE':
			return [...inviteUsers.filter((users) => users.userId !== action.id)];
		case 'INIT':
			return [];
		default:
			throw new Error();
	}
};

interface MatchParams {
	teamId: string;
}

type Props = RouteComponentProps<MatchParams>;

const ChatPage: React.FC<Props> = ({ match }) => {
	const teamId = Number(match.params.teamId);
	const [chatMode, setChatMode] = useState<ChatModeType>('none');
	const [inviteUsers, dispatchInviteUsers] = useReducer(inviteUsersReducer, []);
	const resetCurrentChatRoom = useResetRecoilState(currentChatRoomState);

	const setChatModeToNone = () => setChatMode('none');
	const setChatModeToCreate = () => setChatMode('create');
	const setChatModeToChat = () => setChatMode('chat');

	const addInviteUser = (newUser: UserIdType) => dispatchInviteUsers({ type: 'ADD', newUser });
	const deleteInviteUser = (id: number) => dispatchInviteUsers({ type: 'DELETE', id });
	const initInviteUser = () => dispatchInviteUsers({ type: 'INIT' });

	useEffect(() => {
		resetCurrentChatRoom();
		setChatModeToNone();
		initInviteUser();
	}, [teamId]);

	return (
		<ChatTemplate
			teamId={teamId}
			chatMode={chatMode}
			inviteUsers={inviteUsers}
			setChatModeToNone={setChatModeToNone}
			setChatModeToCreate={setChatModeToCreate}
			setChatModeToChat={setChatModeToChat}
			addInviteUser={addInviteUser}
			deleteInviteUser={deleteInviteUser}
			initInviteUser={initInviteUser}
		/>
	);
};

export default ChatPage;
