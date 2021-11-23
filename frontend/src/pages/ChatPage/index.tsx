import React, { useState, useReducer, useEffect, useContext, useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { UserIdType } from '@src/types/team';
import { MessageType } from '@src/types/chat';
import {
	chatRoomsSelector,
	currentChatRoomState,
	messageListState,
	chatRoomsTrigger,
	chatModeState,
	chatRoomUsersTrigger,
} from '@stores/chat';
import { SocketContext } from '@utils/socketContext';
import { getMessageList } from '@apis/chat';

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

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [inviteUsers, dispatchInviteUsers] = useReducer(inviteUsersReducer, []);

	const [messageList, setMessageList] = useRecoilState(messageListState);
	const chatRooms = useRecoilValue(chatRoomsSelector(teamId));
	const { currChatRoomId } = useRecoilValue(currentChatRoomState);
	const resetCurrentChatRoom = useResetRecoilState(currentChatRoomState);
	const setChatRoomsTrigger = useSetRecoilState(chatRoomsTrigger);
	const setChatRoomUsersTrigger = useSetRecoilState(chatRoomUsersTrigger);
	const setChatMode = useSetRecoilState(chatModeState);

	const addInviteUser = (newUser: UserIdType) => dispatchInviteUsers({ type: 'ADD', newUser });
	const deleteInviteUser = (id: number) => dispatchInviteUsers({ type: 'DELETE', id });
	const initInviteUser = () => dispatchInviteUsers({ type: 'INIT' });

	const chatRoomIdList = Object.keys(chatRooms).map((chatRoomId) => {
		return { chatRoomId };
	});

	const getInitialMessageList = async () => {
		const messages = await getMessageList(currChatRoomId);
		setMessageList(messages);
	};

	const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

	const handleModalOpen = () => setIsModalVisible(true);
	const handleModalClose = () => setIsModalVisible(false);

	useEffect(() => {
		resetCurrentChatRoom();
		setChatMode({ chatMode: 'none' });
		initInviteUser();
	}, [teamId]);

	useEffect(() => {
		if (currChatRoomId !== -1) {
			getInitialMessageList();
			socketRef.current.on('receive message', (message: MessageType) => {
				if (message.chatRoomId === currChatRoomId) {
					setMessageList((prev) => [...prev, message]);
				}
			});
			socketRef.current.on('refresh chat room users', ({ chatRoomId }: { chatRoomId: number }) => {
				if (chatRoomId === currChatRoomId) setChatRoomUsersTrigger((trigger) => trigger + 1);
			});
		}
		return () => {
			socketRef.current.off('receive message');
			socketRef.current.off('refresh chat room users');
		};
	}, [currChatRoomId]);

	useEffect(() => {
		scrollToBottom();
	}, [messageList]);

	useEffect(() => {
		if (socketRef.current) {
			socketRef.current.emit('enter chat rooms', { chatRooms: chatRoomIdList });
			socketRef.current.on('refresh chat rooms', () => setChatRoomsTrigger((trigger) => trigger + 1));
		}
		return () => {
			socketRef.current.emit('leave chat rooms', { chatRooms: chatRoomIdList });
			socketRef.current.off('refresh chat rooms');
		};
	}, [socketRef.current, teamId]);

	return (
		<ChatTemplate
			teamId={teamId}
			inviteUsers={inviteUsers}
			messagesEndRef={messagesEndRef}
			isModalVisible={isModalVisible}
			addInviteUser={addInviteUser}
			deleteInviteUser={deleteInviteUser}
			initInviteUser={initInviteUser}
			handleModalOpen={handleModalOpen}
			handleModalClose={handleModalClose}
		/>
	);
};

export default ChatPage;
