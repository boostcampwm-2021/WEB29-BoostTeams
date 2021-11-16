import React from 'react';
import { ProfileIcon } from '@components/common';
import { timeToString } from '@utils/time';
import { Container, ChatIconWrapper, MessageContainer, InfoContainer, ImojiWraper } from './style';

interface Props {
	message: {
		message_id: number;
		user_id: number;
		user_name: string;
		content: string;
		created_at: Date;
	};
}

const Message: React.FC<Props> = ({ message }) => {
	const user_id = 3;
	const isMyChat = () => message.user_id === user_id;

	return (
		<Container myChat={isMyChat()}>
			{!isMyChat() && (
				<ChatIconWrapper>
					<ProfileIcon name={message.user_name} color={0} status='none' width={3.2} isHover={false} />
				</ChatIconWrapper>
			)}
			<MessageContainer myChat={isMyChat()}>
				<InfoContainer>
					<div>
						{!isMyChat() && <b>{message.user_name}</b>}
						<span>{timeToString(message.created_at)}</span>
					</div>
					<ImojiWraper>👍😲</ImojiWraper>
				</InfoContainer>
				<span>{message.content}</span>
			</MessageContainer>
		</Container>
	);
};

export default Message;
