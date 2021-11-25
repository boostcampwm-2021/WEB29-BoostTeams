import React, { useState, useContext } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { deleteChatRoomUser, socketApi } from '@apis/chat';
import userState from '@stores/user';
import {
	currentChatRoomState,
	chatRoomsSelector,
	chatRoomUsersSelector,
	chatRoomsTrigger,
	chatModeState,
} from '@stores/chat';
import { SocketContext } from '@utils/socketContext';
import { ChatRoomsType, DropdownModeType } from '@src/types/chat';
import { UserIdType } from '@src/types/team';

import { FaUserPlus, FaPen, FaSignOutAlt } from 'react-icons/fa';
import { ProfileIcon } from '@components/common';
import UsersDropdown from '../Dropdown/UsersDropdown';
import InviteDropdown from '../Dropdown/InviteDropdown';
import UpdateDropdown from '../Dropdown/UpdateDropdown';
import { RoomHeaderContainer, ChatRoomInfoContainer, ButtonContainer, UsersDropdownBtn, ExitBtn } from './style';

interface Props {
	teamId: number;
	inviteUsers: UserIdType[];
	addInviteUser: (newUser: UserIdType) => void;
	deleteInviteUser: (id: number) => void;
	initInviteUser: () => void;
}

const RoomHeader: React.FC<Props> = ({ teamId, inviteUsers, addInviteUser, deleteInviteUser, initInviteUser }) => {
	const socketRef = useContext(SocketContext);
	const currChatRoomId = useRecoilValue(currentChatRoomState);
	const resetCurrChatRoom = useResetRecoilState(currentChatRoomState);
	const setChatMode = useSetRecoilState(chatModeState);
	const setChatRoomsTrigger = useSetRecoilState(chatRoomsTrigger);
	const chatRooms = useRecoilValue<ChatRoomsType>(chatRoomsSelector(teamId));
	const chatRoomUserList = useRecoilValue(chatRoomUsersSelector).userList;
	const myId = useRecoilValue(userState).id;

	const [dropdownMode, setDropdownMode] = useState<DropdownModeType>('none');

	const handleDropdownMode = (mode: DropdownModeType) => setDropdownMode(mode);

	const handleChatRoomLeave = async () => {
		const deleteResult = await deleteChatRoomUser(currChatRoomId, myId);
		if (!deleteResult) return;
		socketApi.exitChatRoom(socketRef.current, currChatRoomId);
		setChatMode('none');
		resetCurrChatRoom();
		setChatRoomsTrigger((trigger) => trigger + 1);
	};

	const handleUpdateDropdown = () => {
		if (dropdownMode === 'update') handleDropdownMode('none');
		else handleDropdownMode('update');
	};

	const handleUsersDropdown = () => {
		if (dropdownMode === 'invite' || dropdownMode === 'users') handleDropdownMode('none');
		else handleDropdownMode('users');
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
				<FaPen onClick={handleUpdateDropdown} />
			</ChatRoomInfoContainer>
			<ButtonContainer>
				<UsersDropdownBtn onClick={handleUsersDropdown}>
					<FaUserPlus />
					<span>{chatRoomUserList.length}</span>
				</UsersDropdownBtn>
				<ExitBtn onClick={handleChatRoomLeave}>
					<FaSignOutAlt />
				</ExitBtn>
			</ButtonContainer>
			{dropdownMode === 'update' && <UpdateDropdown teamId={teamId} handleDropdownMode={handleDropdownMode} />}
			{dropdownMode === 'users' && <UsersDropdown teamId={teamId} handleDropdownMode={handleDropdownMode} />}
			{dropdownMode === 'invite' && (
				<InviteDropdown
					teamId={teamId}
					inviteUsers={inviteUsers}
					addInviteUser={addInviteUser}
					deleteInviteUser={deleteInviteUser}
					initInviteUser={initInviteUser}
					handleDropdownMode={handleDropdownMode}
				/>
			)}
		</RoomHeaderContainer>
	);
};

export default RoomHeader;
