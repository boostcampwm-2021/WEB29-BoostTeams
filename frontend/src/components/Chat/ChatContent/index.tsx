import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { FaTelegramPlane } from 'react-icons/fa';

import { createChatRoom } from '@apis/chat';
import userState from '@stores/user';
import { messages, ChatModeType, UserType, ChatRoomType } from '../dataStructure';
import Message from './Message';
import { Container, MessagesContainer, NoticeContainer, InputContainer } from './style';

interface Props {
	teamId: number;
	chatMode: ChatModeType;
	inviteUsers: UserType[];
	setChatModeToChat: () => void;
	addChatRoom: (newRoom: ChatRoomType) => void;
	initInviteUser: () => void;
}

const ChatContent: React.FC<Props> = ({
	teamId,
	chatMode,
	inviteUsers,
	setChatModeToChat,
	addChatRoom,
	initInviteUser,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const user = useRecoilValue(userState);

	const handleNewChatRoom = async () => {
		if (!inputRef.current) return;
		if (inputRef.current.value === '') return;
		if (!inviteUsers.length) return;
		const userIdList = inviteUsers.map((user) => {
			return { user_id: user.user_id };
		});
		const chatRoomName = `${user.name}, ${inviteUsers[0].user_name} ..`;
		const roomInfo = {
			team_id: teamId,
			chat_room_name: chatRoomName,
			user_id_list: [...userIdList, { user_id: user.id }],
		};
		const newChatRoomInfo = await createChatRoom(roomInfo);
		if (!newChatRoomInfo) return;
		addChatRoom(newChatRoomInfo);
		inputRef.current.value = '';
		initInviteUser();
		setChatModeToChat();
	};

	return (
		<Container>
			{chatMode === 'chat' ? (
				<MessagesContainer>
					{messages.map((message) => (
						<Message key={message.message_id} message={message} />
					))}
				</MessagesContainer>
			) : (
				<NoticeContainer>
					<span>새 대화를 시작하고 있습니다.</span>
					<span>아래에 첫 번째 메시지를 입력하세요.</span>
				</NoticeContainer>
			)}
			<InputContainer>
				<input type='text' placeholder='새 메시지 입력' ref={inputRef} />
				<FaTelegramPlane onClick={handleNewChatRoom} />
			</InputContainer>
		</Container>
	);
};

export default ChatContent;
