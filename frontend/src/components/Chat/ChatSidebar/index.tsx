import React from 'react';
import { Sidebar, ProfileIcon } from '@components/common';
import { BiListPlus } from 'react-icons/bi';
import { timeSince } from '@utils/time';
import { SidebarHeader, ChatRoomsContainer, ChatRoom, ChatRoomInfoContainer, ChatRoomInfo, NewChatBtn } from './style';

const chatRooms = [
	{
		title: '채팅방1',
		id: 1,
		previewChat: { message: '안녕아아아아아아아아아아아아아아아아아아아아아아아아', name: '나', date: new Date() },
	},
	{ title: '채팅방2', id: 2, previewChat: { message: '안녕', name: '나', date: new Date(2021, 10, 15, 12, 0) } },
	{ title: '채팅방3', id: 3, previewChat: { message: '안녕', name: '나', date: new Date(2021, 10, 14, 12, 0) } },
	{ title: '채팅방4', id: 4, previewChat: { message: '안녕', name: '나', date: new Date(2021, 10, 7, 12, 0) } },
	{ title: '채팅방5', id: 5, previewChat: { message: '안녕', name: '나', date: new Date(2021, 10, 5, 12, 0) } },
	{ title: '채팅방6', id: 6, previewChat: { message: '안녕', name: '나', date: new Date(2021, 9, 17, 12, 0) } },
	{ title: '채팅방7', id: 7, previewChat: { message: '안녕', name: '나', date: new Date(2021, 9, 1, 12, 0) } },
];

const ChatSidebar: React.FC = () => {
	return (
		<Sidebar>
			<SidebarHeader>
				<h2>채팅</h2>
				<NewChatBtn>
					<BiListPlus />
				</NewChatBtn>
			</SidebarHeader>
			<ChatRoomsContainer>
				{chatRooms.map((chatRoom) => (
					<ChatRoom key={chatRoom.id} focus={false}>
						<ProfileIcon name={chatRoom.title} color={chatRoom.id % 6} status='none' width={3.2} isHover={false} />
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
