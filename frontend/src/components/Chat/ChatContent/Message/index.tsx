import React from 'react';
import { useRecoilValue } from 'recoil';

import userState from '@stores/user';
import { teamUsersSelector } from '@stores/chat';
import { timeToString } from '@utils/time';
import { MessageType, TeamUsersType } from '@src/types/chat';

import { ProfileIcon } from '@components/common';
import { Container, ChatIconWrapper, MessageContainer, InfoContainer, ImojiWraper } from './style';

interface Props {
	teamId: number;
	message: MessageType;
}

const Message: React.FC<Props> = ({ teamId, message }) => {
	const teamUsers = useRecoilValue<TeamUsersType>(teamUsersSelector(teamId));
	const myId = useRecoilValue(userState).id;

	const isMyChat = () => message.userId === myId;

	return (
		<Container myChat={isMyChat()}>
			{!isMyChat() && (
				<ChatIconWrapper>
					{/* teamUsers[chatRoom.lastMessage.userId].name */}
					<ProfileIcon name='작성자' color={0} status='none' width={3.2} isHover={false} />
				</ChatIconWrapper>
			)}
			<MessageContainer myChat={isMyChat()}>
				<InfoContainer>
					<div>
						{/* teamUsers[chatRoom.lastMessage.userId].name */}
						{!isMyChat() && <b>작성자</b>}
						<span>{timeToString(message.createdAt)}</span>
					</div>
					<ImojiWraper>👍😲</ImojiWraper>
				</InfoContainer>
				<span>{message.content}</span>
			</MessageContainer>
		</Container>
	);
};

export default Message;
