import React, { useState, useReducer, useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import { useSetRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { UserIdType, ChatModeType, MessageType } from '@src/types/chat';
import { chatRoomsSelector, currentChatRoomState, messageListState } from '@stores/chat';
import { SocketContext } from '@utils/socketContext';
import { getMessageList } from '@src/apis/chat';

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
	const socketRef = useContext(SocketContext);
	const [chatMode, setChatMode] = useState<ChatModeType>('none');
	const [inviteUsers, dispatchInviteUsers] = useReducer(inviteUsersReducer, []);
	const setMessageList = useSetRecoilState(messageListState);
	const chatRooms = useRecoilValue(chatRoomsSelector(teamId));
	const currentChatRoom = useRecoilValue(currentChatRoomState);
	const resetCurrentChatRoom = useResetRecoilState(currentChatRoomState);

	const setChatModeToNone = () => setChatMode('none');
	const setChatModeToCreate = () => setChatMode('create');
	const setChatModeToChat = () => setChatMode('chat');

	const addInviteUser = (newUser: UserIdType) => dispatchInviteUsers({ type: 'ADD', newUser });
	const deleteInviteUser = (id: number) => dispatchInviteUsers({ type: 'DELETE', id });
	const initInviteUser = () => dispatchInviteUsers({ type: 'INIT' });

	const chatRoomIdList = Object.keys(chatRooms).map((chatRoomId) => {
		return { chatRoomId };
	});

	const getInitialMessageList = async () => {
		const messages = await getMessageList(currentChatRoom.currChatRoomId);
		console.log(messages);
		setMessageList(messages);
	};

	useEffect(() => {
		resetCurrentChatRoom();
		setChatModeToNone();
		initInviteUser();
	}, [teamId]);

	useEffect(() => {
		if (currentChatRoom.currChatRoomId !== -1) {
			getInitialMessageList();
		}
	}, [currentChatRoom]);

	useEffect(() => {
		if (socketRef.current) {
			socketRef.current.emit('enter chat rooms', { chatRooms: chatRoomIdList });
			socketRef.current.on('receive message', (message: MessageType) => setMessageList((prev) => [...prev, message]));
		}
		return () => {
			socketRef.current.emit('leave chat rooms', { chatRooms: chatRoomIdList });
			socketRef.current.off('receive message');
		};
	}, [socketRef.current, teamId]);

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
