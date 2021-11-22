import React, { useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { createChatRoom } from '@apis/chat';
import userState from '@stores/user';
import { chatRoomsTrigger, teamUsersSelector, currentChatRoomState } from '@stores/chat';
import { messagesEx, ChatModeType, UserIdType, TeamUsersType } from '@src/types/chat';

import { FaTelegramPlane } from 'react-icons/fa';
import Message from './Message';
import { Container, MessagesContainer, NoticeContainer, InputContainer } from './style';

interface Props {
	teamId: number;
	chatMode: ChatModeType;
	inviteUsers: UserIdType[];
	setChatModeToChat: () => void;
	initInviteUser: () => void;
}

const ChatContent: React.FC<Props> = ({ teamId, chatMode, inviteUsers, setChatModeToChat, initInviteUser }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const myInfo = useRecoilValue(userState);
	const setCurrentChatRoom = useSetRecoilState(currentChatRoomState);
	const setTeamUsersTrigger = useSetRecoilState(chatRoomsTrigger);
	const teamUsers = useRecoilValue<TeamUsersType>(teamUsersSelector(teamId));

	const handleNewChatRoom = async () => {
		if (!inputRef.current) return;
		if (inputRef.current.value === '') return;
		if (!inviteUsers.length) return;
		const userIdList = inviteUsers.map((user) => {
			return { user_id: user.userId };
		});
		const chatRoomName = `${myInfo.name}, ${teamUsers[inviteUsers[0].userId].name} ..`;
		const roomInfo = {
			team_id: teamId,
			chat_room_name: chatRoomName,
			user_list: [...userIdList, { user_id: myInfo.id }],
		};
		const newChatRoomInfo = await createChatRoom(roomInfo);
		if (!newChatRoomInfo) return;
		inputRef.current.value = '';
		initInviteUser();
		setTeamUsersTrigger((trigger) => trigger + 1);
		setCurrentChatRoom({ currChatRoomId: newChatRoomInfo.chatRoomId });
		setChatModeToChat();
	};

	return (
		<Container>
			{chatMode === 'chat' ? (
				<MessagesContainer>
					{messagesEx.map((message) => (
						<Message key={message.messageId} message={message} teamId={teamId} />
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
