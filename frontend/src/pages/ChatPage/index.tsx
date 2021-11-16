import React, { useState, useReducer } from 'react';
import ChatTemplate from '@templates/ChatTemplate';
import { UserType, ChatModeType } from '@components/Chat/dataStructure';

type InviteUsersAction = { type: 'ADD'; newUser: UserType } | { type: 'DELETE'; email: string };

const inviteUsersReducer = (inviteUsers: UserType[], action: InviteUsersAction): UserType[] => {
	switch (action.type) {
		case 'ADD':
			return [...inviteUsers, action.newUser];
		case 'DELETE':
			return [...inviteUsers.filter((users) => users.user_email !== action.email)];
		default:
			throw new Error();
	}
};

const ChatPage: React.FC = () => {
	const [chatMode, setChatMode] = useState<ChatModeType>('none');
	const [inviteUsers, dispatchInviteUsers] = useReducer(inviteUsersReducer, []);

	const addInviteUser = (newUser: UserType) => dispatchInviteUsers({ type: 'ADD', newUser });
	const deleteInviteUser = (email: string) => dispatchInviteUsers({ type: 'DELETE', email });

	const setChatModeToNone = () => setChatMode('none');
	const setChatModeToCreate = () => setChatMode('create');
	const setChatModeToChat = () => setChatMode('chat');

	return (
		<ChatTemplate
			chatMode={chatMode}
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
