import React, { useReducer, useEffect, useContext, useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import { socketApi } from '@apis/chat';
import userState from '@stores/user';
import { currChatRoomIdState, messagesState, chatModeState, chatRoomsState, chatRoomUsersState } from '@stores/chat';
import { SocketContext } from '@utils/socketContext';
import { UserIdType } from '@src/types/team';
import { MessageType } from '@src/types/chat';

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
			socketApi.receiveMessage(socketRef.current, (message: MessageType) => {
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
			socketApi.joinChatRoom(socketRef.current, (chatRoomId, userList) => {
				if (chatRoomId === currChatRoomId) setChatRoomUsers((prev) => [...prev, ...userList]);
			});
			socketApi.leftChatRoom(socketRef.current, (chatRoomId, userId) => {
				if (chatRoomId === currChatRoomId)
					setChatRoomUsers((prev) => [...prev.filter((user) => user.userId !== userId)]);
			});
		}
		return () => {
			socketApi.offReceiveMessage(socketRef.current);
			socketApi.offJoinChatRoom(socketRef.current);
			socketApi.offLeftChatRoom(socketRef.current);
		};
	}, [socketRef.current, currChatRoomId]);

	useEffect(() => {
		if (socketRef.current) {
			socketApi.enterChatPage(socketRef.current, teamId, myId);
			socketApi.receiveChatRoomsInfo(socketRef.current, (chatRooms) => setChatRooms(chatRooms));
			socketApi.receiveChatRoomInfo(socketRef.current, (userList, messageList) => {
				setMessages(messageList);
				setChatRoomUsers(userList);
			});
			socketApi.invitedToChatRoom(socketRef.current, (chatRoom) => setChatRooms((prev) => [chatRoom, ...prev]));
			socketApi.updatedChatRoomName(socketRef.current, (chatRoomId, chatRoomName) => {
				setChatRooms((prev) => {
					const chatRoom = prev.find((chatRoom) => chatRoom.chatRoomId === chatRoomId);
					if (!chatRoom) return [...prev];
					return [{ ...chatRoom, chatRoomName }, ...prev.filter((chatRoom) => chatRoom.chatRoomId !== chatRoomId)];
				});
			});
			socketApi.error(socketRef.current, (errorMessage) => {
				toast.error(errorMessage);
			});
		}
		return () => {
			socketApi.offReceiveChatRoomsInfo(socketRef.current);
			socketApi.offReceiveChatRoomInfo(socketRef.current);
			socketApi.offInvitedToChatRoom(socketRef.current);
			socketApi.offUpdatedChatRoomName(socketRef.current);
			socketApi.offError(socketRef.current);
		};
	}, [socketRef.current]);

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
