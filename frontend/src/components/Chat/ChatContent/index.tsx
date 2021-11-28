import React, { useRef, useContext } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { socketApi } from '@apis/chat';
import { SocketContext } from '@utils/socketContext';
import { UserIdType } from '@src/types/team';
import userState from '@stores/user';
import { teamUsersSelector } from '@stores/team';
import { chatModeState, currChatRoomIdState, messagesState } from '@stores/chat';

import { FaTelegramPlane } from 'react-icons/fa';
import Message from './Message';
import { Container, MessagesContainer, NoticeContainer, InputContainer } from './style';

interface Props {
	teamId: number;
	inviteUsers: UserIdType[];
	messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatContent: React.FC<Props> = ({ teamId, inviteUsers, messagesEndRef }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const socketRef = useContext(SocketContext);

	const myInfo = useRecoilValue(userState);
	const currChatRoomId = useRecoilValue(currChatRoomIdState);
	const teamUsers = useRecoilValue(teamUsersSelector(teamId));
	const messages = useRecoilValue(messagesState);
	const [chatMode, setChatMode] = useRecoilState(chatModeState);

	const handleEnterCheck = (e: React.KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		if (chatMode === 'create') {
			handleNewChatRoomCreate();
			return;
		}
		handleSendMessage();
	};

	const handleNewChatRoomCreate = () => {
		if (!socketRef.current) return;
		if (!inputRef.current) return;
		if (inputRef.current.value === '') return;
		if (!inviteUsers.length) return;
		const chatRoomName = `${myInfo.name}, ${teamUsers[inviteUsers[0].userId].name} ..`;
		socketApi.createChatRoom(socketRef.current, teamId, chatRoomName, [...inviteUsers, { userId: myInfo.id }], {
			content: inputRef.current.value,
			userId: myInfo.id,
		});
		inputRef.current.value = '';
		setChatMode('none');
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
					{messages.map((message) => (
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
