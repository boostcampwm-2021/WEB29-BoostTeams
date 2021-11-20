import React, { useState, useReducer, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { RouteComponentProps } from 'react-router';
import { readTeamUsers } from '@apis/users';
import { getChatRooms } from '@apis/chat';
import userState from '@stores/user';

import ChatTemplate from '@templates/ChatTemplate';
import { UserType, ChatModeType, ChatRoomType } from '@components/Chat/dataStructure';

type InviteUsersAction = { type: 'ADD'; newUser: UserType } | { type: 'DELETE'; id: number } | { type: 'INIT' };

const inviteUsersReducer = (inviteUsers: UserType[], action: InviteUsersAction): UserType[] => {
	switch (action.type) {
		case 'ADD':
			return [...inviteUsers, action.newUser];
		case 'DELETE':
			return [...inviteUsers.filter((users) => users.user_id !== action.id)];
		case 'INIT':
			return [];
		default:
			throw new Error();
	}
};

type ChatRoomsAction = { type: 'FETCH'; newRooms: ChatRoomType[] } | { type: 'ADD'; newRoom: ChatRoomType };

const ChatRoomsReducer = (chatRooms: ChatRoomType[], action: ChatRoomsAction): ChatRoomType[] => {
	switch (action.type) {
		case 'FETCH':
			return [...action.newRooms];
		case 'ADD':
			return [action.newRoom, ...chatRooms];
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
	const userId = useRecoilValue(userState).id;
	const [chatMode, setChatMode] = useState<ChatModeType>('none');
	const [teamUsers, setTeamUsers] = useState<UserType[]>([]);
	const [chatRooms, dispatchChatRooms] = useReducer(ChatRoomsReducer, []);
	const [inviteUsers, dispatchInviteUsers] = useReducer(inviteUsersReducer, []);

	const setChatModeToNone = () => setChatMode('none');
	const setChatModeToCreate = () => setChatMode('create');
	const setChatModeToChat = () => setChatMode('chat');

	const addInviteUser = (newUser: UserType) => dispatchInviteUsers({ type: 'ADD', newUser });
	const deleteInviteUser = (id: number) => dispatchInviteUsers({ type: 'DELETE', id });
	const initInviteUser = () => dispatchInviteUsers({ type: 'INIT' });

	const fetchChatRooms = (newRooms: ChatRoomType[]) => dispatchChatRooms({ type: 'FETCH', newRooms });
	const addChatRoom = (newRoom: ChatRoomType) => dispatchChatRooms({ type: 'ADD', newRoom });

	const getTeamUsers = async () => {
		const usersData = await readTeamUsers(teamId);
		const teamUsersInfo = usersData
			.filter(({ user }: any) => user.user_id !== userId)
			.map(({ user }: any) => {
				return { user_id: user.user_id, user_name: user.user_name, user_email: user.user_email };
			});
		setTeamUsers(teamUsersInfo);
	};

	const getChatRoomList = async () => {
		fetchChatRooms(await getChatRooms(teamId, userId));
	};

	useEffect(() => {
		if (userId !== -1) {
			getTeamUsers();
			getChatRoomList();
		}
	}, [userId, teamId]);

	return (
		<ChatTemplate
			teamId={teamId}
			chatMode={chatMode}
			chatRooms={chatRooms}
			teamUsers={teamUsers}
			inviteUsers={inviteUsers}
			setChatModeToNone={setChatModeToNone}
			setChatModeToCreate={setChatModeToCreate}
			setChatModeToChat={setChatModeToChat}
			addChatRoom={addChatRoom}
			addInviteUser={addInviteUser}
			deleteInviteUser={deleteInviteUser}
			initInviteUser={initInviteUser}
		/>
	);
};

export default ChatPage;
