import React, { useRef, useContext } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

import { createChatRoom, socketApi } from '@apis/chat';
import { SocketContext } from '@utils/socketContext';
import { UserIdType } from '@src/types/team';
import userState from '@stores/user';
import { teamUsersSelector } from '@stores/team';
import { chatModeState, chatRoomsTrigger, currentChatRoomState, messageListState } from '@stores/chat';

import { FaTelegramPlane } from 'react-icons/fa';
import Message from './Message';
import { Container, MessagesContainer, NoticeContainer, InputContainer } from './style';

interface Props {
	teamId: number;
	inviteUsers: UserIdType[];
	messagesEndRef: React.RefObject<HTMLDivElement>;
	initInviteUser: () => void;
}

const ChatContent: React.FC<Props> = ({ teamId, inviteUsers, messagesEndRef, initInviteUser }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const socketRef = useContext(SocketContext);

	const myInfo = useRecoilValue(userState);
	const teamUsers = useRecoilValue(teamUsersSelector(teamId));
	const setChatRoomsTrigger = useSetRecoilState(chatRoomsTrigger);
	const messageList = useRecoilValue(messageListState);
	const [chatMode, setChatMode] = useRecoilState(chatModeState);
	const [currChatRoomId, setCurrChatRoomId] = useRecoilState(currentChatRoomState);

	const handleEnterCheck = (e: React.KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		if (chatMode === 'create') {
			handleNewChatRoomCreate();
			return;
		}
		handleSendMessage();
	};

	const handleNewChatRoomCreate = async () => {
		if (!socketRef.current) return;
		if (!inputRef.current) return;
		if (inputRef.current.value === '') return;
		if (!inviteUsers.length) return;
		const userIdList = inviteUsers.map((user) => {
			return { user_id: user.userId };
		});
		const chatRoomName = `${myInfo.name}, ${teamUsers[inviteUsers[0].userId].name} ..`;
		const roomInfo = {
			team_id: teamId,
			chat_room_name: chatRoomName,
			user_list: [...userIdList, { user_id: myInfo.id }],
		};
		const newChatRoomInfo = await createChatRoom(roomInfo);
		if (!newChatRoomInfo) return;
		socketApi.createChatRoom(socketRef.current, newChatRoomInfo.chatRoomId, inviteUsers, teamId);
		socketApi.sendMessage(socketRef.current, inputRef.current.value, myInfo.id, newChatRoomInfo.chatRoomId);
		inputRef.current.value = '';
		initInviteUser();
		setChatMode('chat');
		setChatRoomsTrigger((trigger) => trigger + 1);
		setCurrChatRoomId(newChatRoomInfo.chatRoomId);
	};

	const handleSendMessage = () => {
		if (!inputRef.current) return;
		if (inputRef.current.value === '') return;
		socketApi.sendMessage(socketRef.current, inputRef.current.value, myInfo.id, currChatRoomId);
		inputRef.current.value = '';
	};

	return (
		<Container>
			{chatMode === 'chat' ? (
				<MessagesContainer>
					{messageList.map((message) => (
						<Message key={message.messageId} message={message} teamId={teamId} />
					))}
					<div ref={messagesEndRef} />
				</MessagesContainer>
			) : (
				<NoticeContainer>
					<span>새 대화를 시작하고 있습니다.</span>
					<span>아래에 첫 번째 메시지를 입력하세요.</span>
				</NoticeContainer>
			)}
			<InputContainer>
				<input type='text' placeholder='새 메시지 입력' ref={inputRef} onKeyPress={handleEnterCheck} />
				<FaTelegramPlane onClick={chatMode === 'create' ? handleNewChatRoomCreate : handleSendMessage} />
			</InputContainer>
		</Container>
	);
};

export default ChatContent;
