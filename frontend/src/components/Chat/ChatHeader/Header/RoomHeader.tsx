import React, { useState, useContext } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { socketApi } from '@apis/chat';
import userState from '@stores/user';
import { chatModeState, chatRoomsState, currChatRoomIdState, chatRoomUsersState } from '@stores/chat';
import { SocketContext } from '@utils/socketContext';
import { DropdownModeType } from '@src/types/chat';
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
	const myId = useRecoilValue(userState).id;
	const [chatRooms, setChatRooms] = useRecoilState(chatRoomsState);
	const chatRoomUsers = useRecoilValue(chatRoomUsersState);
	const currChatRoomId = useRecoilValue(currChatRoomIdState);
	const resetCurrChatRoom = useResetRecoilState(currChatRoomIdState);
	const setChatMode = useSetRecoilState(chatModeState);

	const [dropdownMode, setDropdownMode] = useState<DropdownModeType>('none');

	const handleDropdownMode = (mode: DropdownModeType) => setDropdownMode(mode);

	const handleChatRoomExit = async () => {
		socketApi.exitChatRoom(socketRef.current, currChatRoomId, myId);
		setChatRooms(chatRooms.filter((chatRoom) => chatRoom.chatRoomId !== currChatRoomId));
		setChatMode('none');
		resetCurrChatRoom();
	};

	const handleUpdateDropdown = () => {
		if (dropdownMode === 'update') handleDropdownMode('none');
		else handleDropdownMode('update');
	};
	const handleUsersDropdown = () => {
		if (dropdownMode === 'invite' || dropdownMode === 'users') handleDropdownMode('none');
		else handleDropdownMode('users');
	};

	const getChatRoomName = (chatRoomId: number) =>
		chatRooms.find((chatRoom) => chatRoom.chatRoomId === chatRoomId)?.chatRoomName;

	return (
		<RoomHeaderContainer>
			<ChatRoomInfoContainer>
				<ProfileIcon
					name={getChatRoomName(currChatRoomId) ?? ''}
					color={currChatRoomId % 6}
					status='none'
					width={3.2}
					isHover={false}
				/>
				<h2>{getChatRoomName(currChatRoomId) ?? ''}</h2>
				<FaPen onClick={handleUpdateDropdown} />
			</ChatRoomInfoContainer>
			<ButtonContainer>
				<UsersDropdownBtn onClick={handleUsersDropdown}>
					<FaUserPlus />
					<span>{chatRoomUsers.length}</span>
				</UsersDropdownBtn>
				<ExitBtn onClick={handleChatRoomExit}>
					<FaSignOutAlt />
				</ExitBtn>
			</ButtonContainer>
			{dropdownMode === 'update' && <UpdateDropdown handleDropdownMode={handleDropdownMode} />}
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
