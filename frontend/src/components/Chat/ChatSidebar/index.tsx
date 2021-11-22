import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { timeSince } from '@utils/time';
import { TeamUsersType } from '@src/types/chat';
import { chatRoomsSelector, currentChatRoomState, teamUsersSelector } from '@src/stores/chat';

import { BiListPlus } from 'react-icons/bi';
import { Sidebar, ProfileIcon } from '@components/common';
import { SidebarHeader, ChatRoomsContainer, ChatRoom, ChatRoomInfoContainer, ChatRoomInfo, NewChatBtn } from './style';

interface Props {
	teamId: number;
	setChatModeToNone: () => void;
	setChatModeToCreate: () => void;
	setChatModeToChat: () => void;
}

const ChatSidebar: React.FC<Props> = ({ teamId, setChatModeToNone, setChatModeToCreate, setChatModeToChat }) => {
	const setCurrentChatRoom = useSetRecoilState(currentChatRoomState);
	const chatRooms = useRecoilValue(chatRoomsSelector(teamId));
	const teamUsers = useRecoilValue<TeamUsersType>(teamUsersSelector(teamId));

	const handleEnterChatRoom = (chatRoomId: number) => {
		setCurrentChatRoom(() => {
			return { currentChatRoom: chatRoomId };
		});
		setChatModeToChat();
	};

	return (
		<Sidebar>
			<SidebarHeader>
				<button type='button' onClick={setChatModeToNone}>
					채팅
				</button>
				<NewChatBtn onClick={setChatModeToCreate}>
					<BiListPlus />
				</NewChatBtn>
			</SidebarHeader>
			<ChatRoomsContainer>
				{Object.values(chatRooms).map((chatRoom) => (
					<ChatRoom key={chatRoom.chatRoomId} focus={false} onClick={() => handleEnterChatRoom(chatRoom.chatRoomId)}>
						<ProfileIcon
							name={chatRoom.chatRoomName}
							color={chatRoom.chatRoomId % 6}
							status='none'
							width={3.2}
							isHover={false}
						/>
						<ChatRoomInfoContainer>
							<ChatRoomInfo>
								<h3>{chatRoom.chatRoomName}</h3>
								<span>{timeSince(new Date())}</span>
							</ChatRoomInfo>
							{/* teamUsers[chatRoom.lastMessage.userId].name */}
							<span>{`${'이름'}: ${chatRoom.lastMessage.content}`}</span>
						</ChatRoomInfoContainer>
					</ChatRoom>
				))}
			</ChatRoomsContainer>
		</Sidebar>
	);
};

export default ChatSidebar;
