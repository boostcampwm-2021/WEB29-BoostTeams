import React from 'react';
import { useHistory } from 'react-router';

import { Container } from './style';
import { LongLogo } from '../Logo';
import ProfileIcon from '../Icons/ProfileIcon';

const Header: React.FC = () => {
	const history = useHistory();

	const linkHome = (e: any) => {
		e.preventDefault();
		// history.push('/');
	};

	return (
		<Container>
			<LongLogo />
			<ProfileIcon name='부' color='orange' status='green' />
		</Container>
	);
};

export default Header;
