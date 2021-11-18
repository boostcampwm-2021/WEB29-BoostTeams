import React from 'react';
import { Header, Navbar } from '@components/common';
import ChatSidebar from '@components/Chat/ChatSidebar';
import ChatHeader from '@components/Chat/ChatHeader';
import ChatContent from '@components/Chat/ChatContent';
import { UserType, ChatModeType, ChatRoomType } from '@components/Chat/dataStructure';
import { Layout, MainContainer, ChatContainer } from './style';

interface Props {
	teamId: number;
	chatMode: ChatModeType;
	chatRooms: ChatRoomType[];
	teamUsers: UserType[];
	inviteUsers: UserType[];
	setChatModeToNone: () => void;
	setChatModeToCreate: () => void;
	setChatModeToChat: () => void;
	addChatRoom: (newRoom: ChatRoomType) => void;
	addInviteUser: (newUser: UserType) => void;
	deleteInviteUser: (id: number) => void;
	initInviteUser: () => void;
}

const ChatTemplate: React.FC<Props> = ({
	teamId,
	chatMode,
	chatRooms,
	teamUsers,
	inviteUsers,
	setChatModeToNone,
	setChatModeToCreate,
	setChatModeToChat,
	addChatRoom,
	addInviteUser,
	deleteInviteUser,
	initInviteUser,
}) => {
	return (
		<Layout>
			<Header />
			<MainContainer>
				<Navbar />
				<ChatSidebar
					chatRooms={chatRooms}
					setChatModeToNone={setChatModeToNone}
					setChatModeToCreate={setChatModeToCreate}
					setChatModeToChat={setChatModeToChat}
				/>
				{chatMode !== 'none' && (
					<ChatContainer>
						<ChatHeader
							chatMode={chatMode}
							teamUsers={teamUsers}
							inviteUsers={inviteUsers}
							addInviteUser={addInviteUser}
							deleteInviteUser={deleteInviteUser}
						/>
						<ChatContent
							teamId={teamId}
							chatMode={chatMode}
							inviteUsers={inviteUsers}
							setChatModeToChat={setChatModeToChat}
							addChatRoom={addChatRoom}
							initInviteUser={initInviteUser}
						/>
					</ChatContainer>
				)}
			</MainContainer>
		</Layout>
	);
};
export default ChatTemplate;
