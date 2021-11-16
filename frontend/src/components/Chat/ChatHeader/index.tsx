import React from 'react';
import { ProfileIcon } from '@components/common';
import { FaUserPlus, FaPen } from 'react-icons/fa';
import { Container, HeaderContainer, InputHeaderContainer, ChatRoomInfoContainer, InvitationBtn } from './style';

interface Props {
	newChatMode: boolean;
}

const chatRoomInfo = {
	title: '채팅방1',
	id: 1,
	userList: ['user1', 'user2', 'user3'],
};

const ChatHeader: React.FC<Props> = ({ newChatMode }) => {
	return (
		<Container>
			{newChatMode ? (
				<InputHeaderContainer>
					<input type='text' placeholder='대상: 이름 입력' />
				</InputHeaderContainer>
			) : (
				<HeaderContainer>
					<ChatRoomInfoContainer>
						<ProfileIcon name={chatRoomInfo.title} color={0} status='none' width={3.2} isHover={false} />
						<h2>{chatRoomInfo.title}</h2>
						<FaPen />
					</ChatRoomInfoContainer>
					<InvitationBtn>
						<FaUserPlus />
						<span>{chatRoomInfo.userList.length}</span>
					</InvitationBtn>
				</HeaderContainer>
			)}
		</Container>
	);
};

export default ChatHeader;
