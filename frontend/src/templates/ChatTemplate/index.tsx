import React from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { MainContainer } from './style';

const Chat = () => {
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
