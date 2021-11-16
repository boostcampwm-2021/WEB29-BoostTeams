import React from 'react';
import { Header, Navbar } from '@components/common';
import Canvas from '@components/Board/Canvas';
import { Layout, MainContainer } from './style';

const BoardTemplate: React.FC = () => {
	return (
		<Layout>
			<Header />
			<MainContainer>
				<Navbar />
				<Canvas />
			</MainContainer>
		</Layout>
	);
};

export default BoardTemplate;
