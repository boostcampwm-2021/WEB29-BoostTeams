import React from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { deleteChatRoomUser } from '@apis/chat';
import userState from '@stores/user';
import { currentChatRoomState, chatRoomsSelector, chatRoomUsersSelector, chatRoomsTrigger } from '@stores/chat';
import { ChatRoomsType } from '@src/types/chat';

import { FaUserPlus, FaPen, FaSignOutAlt } from 'react-icons/fa';
import { ProfileIcon } from '@components/common';
import { HeaderContainer, ChatRoomInfoContainer, ButtonContainer, InvitationBtn, ExitBtn } from './style';

interface Props {
	teamId: number;
	setChatModeToNone: () => void;
	handleModalOpen: () => void;
}

const Header: React.FC<Props> = ({ teamId, setChatModeToNone, handleModalOpen }) => {
	const { currChatRoomId } = useRecoilValue(currentChatRoomState);
	const resetCurrChatRoom = useResetRecoilState(currentChatRoomState);
	const setChatRoomsTrigger = useSetRecoilState(chatRoomsTrigger);
	const chatRooms = useRecoilValue<ChatRoomsType>(chatRoomsSelector(teamId));
	const chatRoomUsers = useRecoilValue(chatRoomUsersSelector).userList;
	const myId = useRecoilValue(userState).id;

	const handleChatRoomLeave = async () => {
		const deleteResult = await deleteChatRoomUser(currChatRoomId, myId);
		if (!deleteResult) return;
		setChatModeToNone();
		resetCurrChatRoom();
		setChatRoomsTrigger((trigger) => trigger + 1);
	};

	return (
		<HeaderContainer>
			<ChatRoomInfoContainer>
				<ProfileIcon
					name={chatRooms[currChatRoomId].chatRoomName}
					color={chatRooms[currChatRoomId].chatRoomId % 6}
					status='none'
					width={3.2}
					isHover={false}
				/>
				<h2>{chatRooms[currChatRoomId].chatRoomName}</h2>
				<FaPen onClick={handleModalOpen} />
			</ChatRoomInfoContainer>
			<ButtonContainer>
				<InvitationBtn>
					<FaUserPlus />
					<span>{chatRoomUsers.length}</span>
				</InvitationBtn>
				<ExitBtn onClick={handleChatRoomLeave}>
					<FaSignOutAlt />
				</ExitBtn>
			</ButtonContainer>
		</HeaderContainer>
	);
};

export default Header;
