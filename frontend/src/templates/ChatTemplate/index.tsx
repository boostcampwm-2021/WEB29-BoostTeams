import React from 'react';
import { Header, Navbar } from '@components/common';
import ChatSidebar from '@src/components/Chat/ChatSidebar';
import { Layout, MainContainer, ChatContainer } from './style';

const ChatTemplate: React.FC = () => {
	return (
		<Layout>
			<Header />
			<MainContainer>
				<Navbar />
				<ChatSidebar />
				<ChatContainer>hi</ChatContainer>
			</MainContainer>
		</Layout>
	);
};
export default ChatTemplate;
