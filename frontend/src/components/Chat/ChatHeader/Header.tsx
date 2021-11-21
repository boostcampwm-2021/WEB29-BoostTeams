import React from 'react';
import { useRecoilValue } from 'recoil';

import { currentChatRoomState, chatRoomsSelector } from '@stores/chat';
import { ChatRoomsType } from '@src/types/chat';

import { FaUserPlus, FaPen } from 'react-icons/fa';
import { ProfileIcon } from '@components/common';
import { HeaderContainer, ChatRoomInfoContainer, InvitationBtn } from './style';

interface Props {
	teamId: number;
}

const Header: React.FC<Props> = ({ teamId }) => {
	const currChatRoom = useRecoilValue(currentChatRoomState).currentChatRoom;
	const chatRooms = useRecoilValue<ChatRoomsType>(chatRoomsSelector(teamId));

	return (
		<HeaderContainer>
			<ChatRoomInfoContainer>
				<ProfileIcon
					name={chatRooms[currChatRoom].chatRoomName}
					color={chatRooms[currChatRoom].chatRoomId % 6}
					status='none'
					width={3.2}
					isHover={false}
				/>
				<h2>{chatRooms[currChatRoom].chatRoomName}</h2>
				<FaPen />
			</ChatRoomInfoContainer>
			<InvitationBtn>
				<FaUserPlus />
				<span>0</span>
			</InvitationBtn>
		</HeaderContainer>
	);
};

export default Header;
