import React from 'react';
import { Header, Navbar } from '@components/common';
import ChatSidebar from '@components/Chat/ChatSidebar';
import ChatHeader from '@components/Chat/ChatHeader';
import ChatContent from '@components/Chat/ChatContent';
import { UserType } from '@components/Chat/dataStructure';
import { Layout, MainContainer, ChatContainer } from './style';

interface Props {
	newChatMode: boolean;
	inviteUsers: UserType[];
	addInviteUser: (newUser: UserType) => void;
	deleteInviteUser: (email: string) => void;
}

const ChatTemplate: React.FC<Props> = ({ newChatMode, inviteUsers, addInviteUser, deleteInviteUser }) => {
	return (
		<Layout>
			<Header />
			<MainContainer>
				<Navbar />
				<ChatSidebar />
				<ChatContainer>
					<ChatHeader
						newChatMode={newChatMode}
						inviteUsers={inviteUsers}
						addInviteUser={addInviteUser}
						deleteInviteUser={deleteInviteUser}
					/>
					<ChatContent />
				</ChatContainer>
			</MainContainer>
		</Layout>
	);
};
export default ChatTemplate;
