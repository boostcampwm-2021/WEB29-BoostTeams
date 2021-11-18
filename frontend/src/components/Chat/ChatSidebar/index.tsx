import React from 'react';
import { Sidebar, ProfileIcon } from '@components/common';
import { BiListPlus } from 'react-icons/bi';
import { timeSince } from '@utils/time';
import { ChatRoomType } from '../dataStructure';
import { SidebarHeader, ChatRoomsContainer, ChatRoom, ChatRoomInfoContainer, ChatRoomInfo, NewChatBtn } from './style';

interface Props {
	chatRooms: ChatRoomType[];
	setChatModeToNone: () => void;
	setChatModeToCreate: () => void;
	setChatModeToChat: () => void;
}

const ChatSidebar: React.FC<Props> = ({ chatRooms, setChatModeToNone, setChatModeToCreate, setChatModeToChat }) => {
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
							name={chatRoom.chat_room_name}
							color={chatRoom.chat_room_id % 6}
							status='none'
							width={3.2}
							isHover={false}
						/>
						<ChatRoomInfoContainer>
							<ChatRoomInfo>
								<h3>{chatRoom.chat_room_name}</h3>
								<span>{timeSince(new Date())}</span>
							</ChatRoomInfo>
							<span>작성자: 메시지</span>
						</ChatRoomInfoContainer>
					</ChatRoom>
				))}
			</ChatRoomsContainer>
		</Sidebar>
	);
};

export default ChatSidebar;
