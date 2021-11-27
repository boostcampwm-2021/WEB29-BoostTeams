import React from 'react';
import { useRecoilValue } from 'recoil';

import { MessageType } from '@src/types/chat';
import userState from '@stores/user';
import { teamUsersSelector } from '@stores/team';
import { timeToString } from '@utils/time';

import { ProfileIcon } from '@components/common';
import { Container, ChatIconWrapper, MessageContainer, InfoContainer } from './style';

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
					<ProfileIcon
						name={teamUsers[message.userId] ? teamUsers[message.userId].name : '알 수 없음'}
						color={teamUsers[message.userId] ? teamUsers[message.userId].color : 0}
						status='none'
						width={3.2}
						isHover={false}
					/>
				</ChatIconWrapper>
			)}
			<MessageContainer myChat={isMyChat()}>
				<InfoContainer>
					<div>
						{!isMyChat() && <b>{teamUsers[message.userId] ? teamUsers[message.userId].name : '알 수 없음'}</b>}
						<span>{timeToString(new Date(message.createdAt))}</span>
					</div>
				</InfoContainer>
				<span>{message.content}</span>
			</MessageContainer>
		</Container>
	);
};

export default Message;
