import React from 'react';
import { Container } from './style';

const Sidebar: React.FC = ({ children }) => {
	return <Container>{children}</Container>;
};

export default Sidebar;
