import React from 'react';
import { ProfileIcon } from '@components/common';
import { FaUserPlus, FaPen } from 'react-icons/fa';
import { HeaderContainer, ChatRoomInfoContainer, InvitationBtn } from './style';

const chatRoomInfo = {
	title: '채팅방1',
	id: 1,
	userList: ['user1', 'user2', 'user3'],
};

const Header: React.FC = () => {
	return (
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
	);
};

export default Header;
