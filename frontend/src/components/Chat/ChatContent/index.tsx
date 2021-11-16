import React from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import Message from './Message';
import { messages } from '../dataStructure';
import { Container, MessagesContainer, InputContainer } from './style';

const ChatContent: React.FC = () => {
	return (
		<Container>
			<MessagesContainer>
				{/* {messages.map((message) => (
					<Message key={message.message_id} message={message} />
				))} */}
			</MessagesContainer>
			<InputContainer>
				<input type='text' placeholder='새 메시지 입력' />
				<FaTelegramPlane />
			</InputContainer>
		</Container>
	);
};

export default ChatContent;
