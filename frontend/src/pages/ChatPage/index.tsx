import React, { useReducer, useEffect, useContext, useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { UserIdType } from '@src/types/team';
import { LastMessagesType, MessageType } from '@src/types/chat';
import {
	chatRoomsSelector,
	currentChatRoomState,
	messageListState,
	chatRoomsTrigger,
	chatModeState,
	chatRoomUsersTrigger,
	LastMessagesState,
} from '@stores/chat';
import { SocketContext } from '@utils/socketContext';
import { socketApi } from '@src/apis/chat';

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
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const [inviteUsers, dispatchInviteUsers] = useReducer(inviteUsersReducer, []);

	const [messageList, setMessageList] = useRecoilState(messageListState);
	const chatRooms = useRecoilValue(chatRoomsSelector(teamId));
	const { currChatRoomId } = useRecoilValue(currentChatRoomState);
	const resetCurrentChatRoom = useResetRecoilState(currentChatRoomState);
	const setChatRoomsTrigger = useSetRecoilState(chatRoomsTrigger);
	const setChatRoomUsersTrigger = useSetRecoilState(chatRoomUsersTrigger);
	const setChatMode = useSetRecoilState(chatModeState);
	const setLastMessages = useSetRecoilState(LastMessagesState);

	const addInviteUser = (newUser: UserIdType) => dispatchInviteUsers({ type: 'ADD', newUser });
	const deleteInviteUser = (id: number) => dispatchInviteUsers({ type: 'DELETE', id });
	const initInviteUser = () => dispatchInviteUsers({ type: 'INIT' });

	const chatRoomIdList = Object.keys(chatRooms).map((chatRoomId) => {
		return { chatRoomId: Number(chatRoomId) };
	});

	const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

	useEffect(() => {
		resetCurrentChatRoom();
		setChatMode({ chatMode: 'none' });
		initInviteUser();
	}, [teamId]);

	useEffect(() => {
		scrollToBottom();
	}, [messageList]);

	useEffect(() => {
		if (socketRef.current && currChatRoomId !== -1) {
			socketApi.getMessageList(socketRef.current, currChatRoomId);
			socketRef.current.on(
				'receive message list',
				({ chatRoomId, messageList }: { chatRoomId: number; messageList: MessageType[] }) => {
					if (chatRoomId === currChatRoomId) setMessageList([...messageList]);
				},
			);
			socketRef.current.on('refresh chat room users', ({ chatRoomId }: { chatRoomId: number }) => {
				if (chatRoomId === currChatRoomId) setChatRoomUsersTrigger((trigger) => trigger + 1);
			});
		}
		if (socketRef.current) {
			socketRef.current.on('receive message', (message: MessageType) => {
				setLastMessages((prev) => {
					const { chatRoomId } = message;
					return { ...prev, [chatRoomId]: message };
				});
				if (message.chatRoomId === currChatRoomId) setMessageList((prev) => [...prev, message]);
			});
		}
		return () => {
			socketRef.current.off('receive message list');
			socketRef.current.off('receive message');
			socketRef.current.off('refresh chat room users');
		};
	}, [socketRef.current, currChatRoomId]);

	useEffect(() => {
		if (socketRef.current) {
			socketApi.enterChatRooms(socketRef.current, chatRoomIdList);
			socketRef.current.on('receive last messages', (lastMessages: LastMessagesType) => setLastMessages(lastMessages));
			socketRef.current.on('refresh chat rooms', () => setChatRoomsTrigger((trigger) => trigger + 1));
		}
		return () => {
			socketApi.leaveChatRooms(socketRef.current, chatRoomIdList);
			socketRef.current.off('receive last messages');
			socketRef.current.off('refresh chat rooms');
		};
	}, [socketRef.current, teamId]);

	return (
		<ChatTemplate
			teamId={teamId}
			inviteUsers={inviteUsers}
			messagesEndRef={messagesEndRef}
			addInviteUser={addInviteUser}
			deleteInviteUser={deleteInviteUser}
			initInviteUser={initInviteUser}
		/>
	);
};

export default ChatPage;
