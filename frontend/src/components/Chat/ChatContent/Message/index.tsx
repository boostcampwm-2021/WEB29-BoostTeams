import React from 'react';
import { useRecoilValue } from 'recoil';

import { MessageType } from '@src/types/chat';
import userState from '@stores/user';
import { teamUsersSelector } from '@stores/team';
import { timeToString } from '@utils/time';

import { ProfileIcon } from '@components/common';
import { Container, ChatIconWrapper, MessageContainer, InfoContainer, ImojiWraper } from './style';

interface Props {
	teamId: number;
	message: MessageType;
}

const Message: React.FC<Props> = ({ teamId, message }) => {
	const teamUsers = useRecoilValue(teamUsersSelector(teamId));
	const myId = useRecoilValue(userState).id;

	const isMyChat = () => message.userId === myId;

	return (
		<Container myChat={isMyChat()}>
			{!isMyChat() && (
				<ChatIconWrapper>
					<ProfileIcon name={teamUsers[message.userId].name} color={0} status='none' width={3.2} isHover={false} />
				</ChatIconWrapper>
			)}
			<MessageContainer myChat={isMyChat()}>
				<InfoContainer>
					<div>
						{!isMyChat() && <b>{teamUsers[message.userId].name}</b>}
						<span>{timeToString(new Date(message.createdAt))}</span>
					</div>
					<ImojiWraper>👍😲</ImojiWraper>
				</InfoContainer>
				<span>{message.content}</span>
			</MessageContainer>
		</Container>
	);
};

export default Message;
