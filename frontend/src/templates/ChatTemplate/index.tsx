import React from 'react';
import { Header, Navbar } from '@components/common';
import ChatSidebar from '@components/Chat/ChatSidebar';
import ChatHeader from '@components/Chat/ChatHeader';
import ChatContent from '@components/Chat/ChatContent';
import { UserType, ChatModeType } from '@components/Chat/dataStructure';
import { Layout, MainContainer, ChatContainer } from './style';

interface Props {
	teamId: number;
	chatMode: ChatModeType;
	teamUsers: UserType[];
	inviteUsers: UserType[];
	setChatModeToNone: () => void;
	setChatModeToCreate: () => void;
	setChatModeToChat: () => void;
	addInviteUser: (newUser: UserType) => void;
	deleteInviteUser: (id: number) => void;
	initInviteUser: () => void;
}

const ChatTemplate: React.FC<Props> = ({
	teamId,
	chatMode,
	teamUsers,
	inviteUsers,
	setChatModeToNone,
	setChatModeToCreate,
	setChatModeToChat,
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
							initInviteUser={initInviteUser}
						/>
					</ChatContainer>
				)}
			</MainContainer>
		</Layout>
	);
};
export default ChatTemplate;
