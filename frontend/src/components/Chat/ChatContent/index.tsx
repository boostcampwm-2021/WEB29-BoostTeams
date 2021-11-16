import React from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import Message from './Message';
import { messages, ChatModeType } from '../dataStructure';
import { Container, MessagesContainer, NoticeContainer, InputContainer } from './style';

interface Props {
	chatMode: ChatModeType;
}

const ChatContent: React.FC<Props> = ({ chatMode }) => {
	return (
		<Container>
			{chatMode === 'chat' ? (
				<MessagesContainer>
					{messages.map((message) => (
						<Message key={message.message_id} message={message} />
					))}
				</MessagesContainer>
			) : (
				<NoticeContainer>
					<span>새 대화를 시작하고 있습니다.</span>
					<span>아래에 첫 번째 메시지를 입력하세요.</span>
				</NoticeContainer>
			)}
			<InputContainer>
				<input type='text' placeholder='새 메시지 입력' />
				<FaTelegramPlane />
			</InputContainer>
		</Container>
	);
};

export default ChatContent;
