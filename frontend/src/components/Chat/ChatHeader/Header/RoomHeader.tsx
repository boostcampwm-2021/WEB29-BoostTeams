import React, { useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { deleteChatRoomUser } from '@apis/chat';
import userState from '@stores/user';
import {
	currentChatRoomState,
	chatRoomsSelector,
	chatRoomUsersSelector,
	chatRoomsTrigger,
	chatModeState,
} from '@stores/chat';
import { ChatRoomsType } from '@src/types/chat';
import { UserIdType } from '@src/types/team';

import { FaUserPlus, FaPen, FaSignOutAlt } from 'react-icons/fa';
import { ProfileIcon } from '@components/common';
import UsersDropDown from '../DropDown/UsersDropDown';
import InviteDropDown from '../DropDown/InviteDropDown';
import { RoomHeaderContainer, ChatRoomInfoContainer, ButtonContainer, UserDropDownBtn, ExitBtn } from './style';

interface Props {
	teamId: number;
	inviteUsers: UserIdType[];
	addInviteUser: (newUser: UserIdType) => void;
	deleteInviteUser: (id: number) => void;
	handleModalOpen: () => void;
}

const RoomHeader: React.FC<Props> = ({ teamId, inviteUsers, addInviteUser, deleteInviteUser, handleModalOpen }) => {
	const { currChatRoomId } = useRecoilValue(currentChatRoomState);
	const resetCurrChatRoom = useResetRecoilState(currentChatRoomState);
	const setChatMode = useSetRecoilState(chatModeState);
	const setChatRoomsTrigger = useSetRecoilState(chatRoomsTrigger);
	const chatRooms = useRecoilValue<ChatRoomsType>(chatRoomsSelector(teamId));
	const chatRoomUsers = useRecoilValue(chatRoomUsersSelector).userList;
	const myId = useRecoilValue(userState).id;

	const [isUsersDropDownVisible, setIsUsersDropDownVisible] = useState(false);
	const [isInviteDropDownVisible, setIsInviteDropDownVisible] = useState(false);

	const handleUsersDropDownToggle = () => setIsUsersDropDownVisible(!isUsersDropDownVisible);
	const handleUsersDropDownClose = () => setIsUsersDropDownVisible(false);

	const handleInviteDropDownOpen = () => setIsInviteDropDownVisible(true);
	const handleInviteDropDownClose = () => setIsInviteDropDownVisible(false);

	const handleChatRoomLeave = async () => {
		const deleteResult = await deleteChatRoomUser(currChatRoomId, myId);
		if (!deleteResult) return;
		setChatMode({ chatMode: 'none' });
		resetCurrChatRoom();
		setChatRoomsTrigger((trigger) => trigger + 1);
	};

	return (
		<RoomHeaderContainer>
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
				<UserDropDownBtn onClick={handleUsersDropDownToggle}>
					<FaUserPlus />
					<span>{chatRoomUsers.length}</span>
				</UserDropDownBtn>
				<ExitBtn onClick={handleChatRoomLeave}>
					<FaSignOutAlt />
				</ExitBtn>
			</ButtonContainer>
			{isUsersDropDownVisible && (
				<UsersDropDown
					teamId={teamId}
					handleUsersDropDownClose={handleUsersDropDownClose}
					handleInviteDropDownOpen={handleInviteDropDownOpen}
				/>
			)}
			{isInviteDropDownVisible && (
				<InviteDropDown
					teamId={teamId}
					inviteUsers={inviteUsers}
					addInviteUser={addInviteUser}
					deleteInviteUser={deleteInviteUser}
					handleInviteDropDownClose={handleInviteDropDownClose}
				/>
			)}
		</RoomHeaderContainer>
	);
};

export default RoomHeader;
