import React from 'react';
import { Header, Navbar, Sidebar } from '@components/common';
import { MainContainer } from './style';

const Chat: React.FC = () => {
	return (
		<div>
			<Header />
			<MainContainer>
				<Navbar />
				<Sidebar />
			</MainContainer>
		</div>
	);
};
export default Chat;
