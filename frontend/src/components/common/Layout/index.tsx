import React from 'react';
import { Header, Navbar } from '..';
import { MainContainer } from './style';

const Layout: React.FC = ({ children }) => {
	return (
		<>
			<Header />
			<MainContainer>
				<Navbar />
				{children}
			</MainContainer>
		</>
	);
};

export default Layout;
