import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { timeSince } from '@utils/time';
import { MessageType } from '@src/types/chat';
import { teamUsersSelector } from '@stores/team';
import { chatModeState, chatRoomsSelector, currentChatRoomState, LastMessagesState } from '@stores/chat';

import { BiListPlus } from 'react-icons/bi';
import { Sidebar, ProfileIcon } from '@components/common';
import { SidebarHeader, ChatRoomsContainer, ChatRoom, ChatRoomInfoContainer, ChatRoomInfo, NewChatBtn } from './style';

interface Props {
	teamId: number;
}

const ChatSidebar: React.FC<Props> = ({ teamId }) => {
	const setCurrentChatRoom = useSetRecoilState(currentChatRoomState);
	const setChatMode = useSetRecoilState(chatModeState);
	const chatRooms = useRecoilValue(chatRoomsSelector(teamId));
	const teamUsers = useRecoilValue(teamUsersSelector(teamId));
	const lastMessages = useRecoilValue(LastMessagesState);
	const [sortedMessageList, setSortedMessageList] = useState<MessageType[]>([]);

	const handleEnterChatRoom = (chatRoomId: number) => {
		setCurrentChatRoom({ currChatRoomId: chatRoomId });
		setChatMode({ chatMode: 'chat' });
	};

	useEffect(() => {
		const lastMessageList = Object.values(lastMessages).sort(
			(a: MessageType, b: MessageType) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		);
		setSortedMessageList(lastMessageList);
	}, [lastMessages]);

	return (
		<Sidebar>
			<SidebarHeader>
				<button type='button' onClick={() => setChatMode({ chatMode: 'none' })}>
					채팅
				</button>
				<NewChatBtn onClick={() => setChatMode({ chatMode: 'create' })}>
					<BiListPlus />
				</NewChatBtn>
			</SidebarHeader>
			<ChatRoomsContainer>
				{sortedMessageList.map((message) => (
					<>
						{chatRooms[message.chatRoomId] && (
							<ChatRoom key={message.chatRoomId} focus={false} onClick={() => handleEnterChatRoom(message.chatRoomId)}>
								<ProfileIcon
									name={
										chatRooms[message.chatRoomId] && chatRooms[message.chatRoomId].chatRoomName
											? chatRooms[message.chatRoomId].chatRoomName
											: ''
									}
									color={message.chatRoomId % 6}
									status='none'
									width={3.2}
									isHover={false}
								/>
								<ChatRoomInfoContainer>
									<ChatRoomInfo>
										<h3>
											{chatRooms[message.chatRoomId] && chatRooms[message.chatRoomId].chatRoomName
												? chatRooms[message.chatRoomId].chatRoomName
												: ''}
										</h3>
										<span>{timeSince(new Date(message.createdAt))}</span>
									</ChatRoomInfo>
									<span>{`${teamUsers[message.userId] ? teamUsers[message.userId].name : '알 수 없음'}: ${
										message.content
									}`}</span>
								</ChatRoomInfoContainer>
							</ChatRoom>
						)}
					</>
				))}
			</ChatRoomsContainer>
		</Sidebar>
	);
};

export default ChatSidebar;
