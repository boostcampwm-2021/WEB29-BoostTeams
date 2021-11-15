import React from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import Message from './Message';
import { Container, MessagesContainer, InputContainer } from './style';

const messages = [
	{ message_id: 1, user_id: 1, user_name: 'user1', content: 'hi', created_at: new Date() },
	{ message_id: 2, user_id: 2, user_name: 'user2', content: 'hi2', created_at: new Date() },
	{ message_id: 3, user_id: 3, user_name: 'user3', content: 'hi3', created_at: new Date() },
	{
		message_id: 4,
		user_id: 4,
		user_name: 'user4',
		content: 'hiㅁㅎㅇㄴㅇㅎㄴㅇㅎㄴㅇㅎㄴㅇㅎㄴㅇㅎㄴㅁㅇㅎㄴㅇㅎㄴㅇㅎㄴㅁㅎㄴㅇㅎㄴㅇㅎㄴㅇㅎㄴㄴㅇㄴㅇㅎㄴㅎㅇ4',
		created_at: new Date(),
	},
	{ message_id: 5, user_id: 5, user_name: 'user5', content: 'hi3', created_at: new Date() },
	{ message_id: 6, user_id: 6, user_name: 'user6', content: 'hi4', created_at: new Date() },
	{ message_id: 7, user_id: 7, user_name: 'user7', content: 'hi3', created_at: new Date() },
	{ message_id: 8, user_id: 3, user_name: 'user8', content: 'hi4', created_at: new Date() },
	{ message_id: 9, user_id: 3, user_name: 'user9', content: 'hi3', created_at: new Date() },
	{ message_id: 10, user_id: 10, user_name: 'user10', content: 'hi4', created_at: new Date() },
	{ message_id: 11, user_id: 11, user_name: 'user11', content: 'hi3', created_at: new Date() },
	{ message_id: 12, user_id: 12, user_name: 'user12', content: 'hi4', created_at: new Date() },
];

const ChatContent: React.FC = () => {
	return (
		<Container>
			<MessagesContainer>
				{messages.map((message) => (
					<Message key={message.message_id} message={message} />
				))}
			</MessagesContainer>
			<InputContainer>
				<input type='text' placeholder='새 메시지 입력' />
				<FaTelegramPlane />
			</InputContainer>
		</Container>
	);
};

export default ChatContent;
