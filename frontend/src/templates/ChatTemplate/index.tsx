import React from 'react';
import { Header, Navbar } from '@components/common';
import ChatSidebar from '@components/Chat/ChatSidebar';
import ChatHeader from '@components/Chat/ChatHeader';
import ChatContent from '@components/Chat/ChatContent';
import { Layout, MainContainer, ChatContainer } from './style';

interface Props {
	newChatMode: boolean;
}

const ChatTemplate: React.FC<Props> = ({ newChatMode }) => {
	return (
		<Layout>
			<Header />
			<MainContainer>
				<Navbar />
				<ChatSidebar />
				<ChatContainer>
					<ChatHeader newChatMode={newChatMode} />
					<ChatContent />
				</ChatContainer>
			</MainContainer>
		</Layout>
	);
};
export default ChatTemplate;
