import React, { useReducer, useEffect, useContext, useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import { socketApi } from '@apis/chat';
import userState from '@stores/user';
import { currChatRoomIdState, messagesState, chatModeState, chatRoomsState, chatRoomUsersState } from '@stores/chat';
import { SocketContext } from '@utils/socketContext';
import { UserIdType } from '@src/types/team';
import { ChatRoomListType, ChatRoomType, MessageListType, MessageType } from '@src/types/chat';

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

	const myId = useRecoilValue(userState).id;
	const [messages, setMessages] = useRecoilState(messagesState);
	const currChatRoomId = useRecoilValue(currChatRoomIdState);
	const setChatRooms = useSetRecoilState(chatRoomsState);
	const resetCurrentChatRoom = useResetRecoilState(currChatRoomIdState);
	const setChatMode = useSetRecoilState(chatModeState);
	const setChatRoomUsers = useSetRecoilState(chatRoomUsersState);

	const addInviteUser = (newUser: UserIdType) => dispatchInviteUsers({ type: 'ADD', newUser });
	const deleteInviteUser = (id: number) => dispatchInviteUsers({ type: 'DELETE', id });
	const initInviteUser = () => dispatchInviteUsers({ type: 'INIT' });

	const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

	useEffect(() => {
		resetCurrentChatRoom();
		setChatMode('none');
		initInviteUser();
	}, [teamId]);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		if (socketRef.current) {
			initInviteUser();
			socketRef.current.on('receive message', (message: MessageType) => {
				setChatRooms((prev) => {
					const chatRoom = prev.find((chatRoom) => chatRoom.chatRoomId === message.chatRoomId);
					if (!chatRoom) return [...prev];
					return [
						{ ...chatRoom, lastMessage: message },
						...prev.filter((chatRoom) => chatRoom.chatRoomId !== message.chatRoomId),
					];
				});
				if (message.chatRoomId === currChatRoomId) setMessages((messages) => [...messages, message]);
			});
			socketRef.current.on(
				'join chat room',
				({ chatRoomId, userList }: { chatRoomId: number; userList: UserIdType[] }) => {
					if (chatRoomId === currChatRoomId) setChatRoomUsers((prev) => [...prev, ...userList]);
				},
			);
			socketRef.current.on('left chat room', ({ chatRoomId, userId }: { chatRoomId: number; userId: number }) => {
				if (chatRoomId === currChatRoomId)
					setChatRoomUsers((prev) => [...prev.filter((user) => user.userId !== userId)]);
			});
		}
		return () => {
			socketRef.current.off('receive message');
			socketRef.current.off('join chat room');
			socketRef.current.off('left chat room');
		};
	}, [socketRef.current, currChatRoomId]);

	useEffect(() => {
		if (socketRef.current) {
			socketApi.enterChatPage(socketRef.current, teamId, myId);
			socketRef.current.on('receive chat rooms info', ({ chatRooms }: { chatRooms: ChatRoomListType }) =>
				setChatRooms(chatRooms),
			);
			socketRef.current.on(
				'receive chat room info',
				({ userList, messageList }: { chatRoomId: number; userList: UserIdType[]; messageList: MessageListType }) => {
					setMessages(messageList);
					setChatRoomUsers(userList);
				},
			);
			socketRef.current.on('invited to chat room', (chatRoom: ChatRoomType) =>
				setChatRooms((prev) => [chatRoom, ...prev]),
			);
			socketRef.current.on(
				'updated chat room name',
				({ chatRoomId, chatRoomName }: { chatRoomId: number; chatRoomName: string }) => {
					setChatRooms((prev) => {
						const chatRoom = prev.find((chatRoom) => chatRoom.chatRoomId === chatRoomId);
						if (!chatRoom) return [...prev];
						return [{ ...chatRoom, chatRoomName }, ...prev.filter((chatRoom) => chatRoom.chatRoomId !== chatRoomId)];
					});
				},
			);
			socketRef.current.on('chat error', (errorMessage: string) => {
				toast.error(errorMessage);
			});
		}
		return () => {
			socketRef.current.off('receive chat rooms info');
			socketRef.current.off('receive chat room info');
			socketRef.current.off('invited to chat room');
			socketRef.current.off('updated chat room name');
			socketRef.current.off('chat error');
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
