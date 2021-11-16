import React from 'react';
import { Sidebar, ProfileIcon } from '@components/common';
import { BiListPlus } from 'react-icons/bi';
import { timeSince } from '@utils/time';
import { chatRooms } from '../dataStructure';
import { SidebarHeader, ChatRoomsContainer, ChatRoom, ChatRoomInfoContainer, ChatRoomInfo, NewChatBtn } from './style';

interface Props {
	setChatModeToNone: () => void;
	setChatModeToCreate: () => void;
	setChatModeToChat: () => void;
}

const ChatSidebar: React.FC<Props> = ({ setChatModeToNone, setChatModeToCreate, setChatModeToChat }) => {
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
				{chatRooms.map((chatRoom) => (
					<ChatRoom key={chatRoom.chat_room_id} focus={false} onClick={setChatModeToChat}>
						<ProfileIcon
							name={chatRoom.title}
							color={chatRoom.chat_room_id % 6}
							status='none'
							width={3.2}
							isHover={false}
						/>
						<ChatRoomInfoContainer>
							<ChatRoomInfo>
								<h3>{chatRoom.title}</h3>
								<span>{timeSince(chatRoom.previewChat.date)}</span>
							</ChatRoomInfo>
							<span>
								{chatRoom.previewChat.name}: {chatRoom.previewChat.message}
							</span>
						</ChatRoomInfoContainer>
					</ChatRoom>
				))}
			</ChatRoomsContainer>
		</Sidebar>
	);
};

export default ChatSidebar;
