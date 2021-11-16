import React from 'react';
import { Header, Navbar } from '@components/common';
import ChatSidebar from '@components/Chat/ChatSidebar';
import ChatHeader from '@components/Chat/ChatHeader';
import ChatContent from '@components/Chat/ChatContent';
import { UserType } from '@components/Chat/dataStructure';
import { Layout, MainContainer, ChatContainer } from './style';

interface Props {
	chatMode: string;
	inviteUsers: UserType[];
	setChatModeToNone: () => void;
	setChatModeToCreate: () => void;
	setChatModeToChat: () => void;
	addInviteUser: (newUser: UserType) => void;
	deleteInviteUser: (email: string) => void;
}

const ChatTemplate: React.FC<Props> = ({
	chatMode,
	inviteUsers,
	setChatModeToNone,
	setChatModeToCreate,
	setChatModeToChat,
	addInviteUser,
	deleteInviteUser,
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
							inviteUsers={inviteUsers}
							addInviteUser={addInviteUser}
							deleteInviteUser={deleteInviteUser}
						/>
						<ChatContent />
					</ChatContainer>
				)}
			</MainContainer>
		</Layout>
	);
};
export default ChatTemplate;
