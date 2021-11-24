import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { timeSince } from '@utils/time';
import { TeamUsersType } from '@src/types/team';
import { teamUsersSelector } from '@stores/team';
import { chatModeState, chatRoomsSelector, currentChatRoomState } from '@stores/chat';

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

	const handleEnterChatRoom = (chatRoomId: number) => {
		setCurrentChatRoom(() => {
			return { currChatRoomId: chatRoomId };
		});
		setChatMode({ chatMode: 'chat' });
	};

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
							{/* teamUsers[lastMessage.userId].name */}
							<span>{`${'이름'}: ${'내용'}`}</span>
						</ChatRoomInfoContainer>
					</ChatRoom>
				))}
			</ChatRoomsContainer>
		</Sidebar>
	);
};

export default ChatSidebar;
