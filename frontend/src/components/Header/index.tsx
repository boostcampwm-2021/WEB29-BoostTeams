import React from 'react';
import { useHistory } from 'react-router';
import { Container, LogoWrapper } from './style';
import ProfileIcon from '../Icons/ProfileIcon';

const Header = () => {
	const history = useHistory();

	const linkHome = (e: any) => {
		e.preventDefault();
		// history.push('/');
	};

	return (
		<Container>
			<LogoWrapper>
				<a href='/' onClick={linkHome}>
					<img src='logo.png' alt='logo' />
					BoostTeams
				</a>
			</LogoWrapper>
			<ProfileIcon name='부' color='orange' status='green' />
		</Container>
	);
};

export default Header;
