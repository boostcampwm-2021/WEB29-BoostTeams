import React, { useState, useContext, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

import { timeSince } from '@utils/time';
import { teamUsersSelector } from '@stores/team';
import { chatModeState, currChatRoomIdState, chatRoomsState } from '@stores/chat';
import { socketApi } from '@apis/chat';
import { SocketContext } from '@utils/socketContext';
import { ChatRoomListType } from '@src/types/chat';

import { FaRegPlusSquare } from 'react-icons/fa';
import { Sidebar, ProfileIcon } from '@components/common';
import { SidebarHeader, ChatRoomsContainer, ChatRoom, ChatRoomInfoContainer, ChatRoomInfo, NewChatBtn } from './style';

interface Props {
	teamId: number;
}

const ChatSidebar: React.FC<Props> = ({ teamId }) => {
	const socketRef = useContext(SocketContext);
	const [sortedChatRooms, setSortedChatRooms] = useState<ChatRoomListType>([]);
	const [currChatRoomId, setCurrChatRoomId] = useRecoilState(currChatRoomIdState);
	const chatRooms = useRecoilValue(chatRoomsState);
	const teamUsers = useRecoilValue(teamUsersSelector(teamId));
	const setChatMode = useSetRecoilState(chatModeState);

	const handleEnterChatRoom = (chatRoomId: number) => {
		socketApi.enterChatRoom(socketRef.current, chatRoomId);
		setCurrChatRoomId(chatRoomId);
		setChatMode('chat');
	};
	const handleChatModeNone = () => {
		setChatMode('none');
		setCurrChatRoomId(-1);
	};
	const handleChatModeCreate = () => {
		setChatMode('create');
		setCurrChatRoomId(-1);
	};

	useEffect(() => {
		setSortedChatRooms(
			[...chatRooms].sort(
				(a, b) => new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime(),
			),
		);
	}, [chatRooms]);

	return (
		<Sidebar>
			<SidebarHeader>
				<button type='button' onClick={handleChatModeNone}>
					채팅
				</button>
				<NewChatBtn onClick={handleChatModeCreate} aria-label='New Chat'>
					<FaRegPlusSquare />
				</NewChatBtn>
			</SidebarHeader>
			<ChatRoomsContainer>
				{sortedChatRooms.map((chatRoom) => (
					<ChatRoom
						key={chatRoom.chatRoomId}
						focus={chatRoom.chatRoomId === currChatRoomId}
						onClick={() => handleEnterChatRoom(chatRoom.chatRoomId)}
					>
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
								<span>{timeSince(new Date(chatRoom.lastMessage.createdAt))}</span>
							</ChatRoomInfo>
							<span>{`${
								teamUsers[chatRoom.lastMessage.userId] ? teamUsers[chatRoom.lastMessage.userId].name : '알 수 없음'
							}: ${chatRoom.lastMessage.content}`}</span>
						</ChatRoomInfoContainer>
					</ChatRoom>
				))}
			</ChatRoomsContainer>
		</Sidebar>
	);
};

export default ChatSidebar;
