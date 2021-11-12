import React from 'react';
import { Meta } from '@storybook/react';
import ProfileSimple from './index';
import { Background, Container, ModalContainer } from './style';
import UserInfo from './UserInfo';
import { AccountButton, LogoutButton } from './Buttons';

export default {
	title: 'common/Profile',
	component: ProfileSimple,
} as Meta;

const user = {
	name: 'boostteams',
	email: 'boostteams@boostcamp.com',
	state: 0,
};

const githubUser = {
	name: 'boostteams',
	email: 'boostteams@boostcamp.com',
	state: 0,
	github: 'boostteams',
};

export const NotInTeam = () => {
	const status = 'none';
	const clickHandler = () => undefined;
	const logoutHandler = () => undefined;
	const handleModalClose = () => undefined;
	return (
		<Container>
			<ModalContainer>
				<UserInfo user={user} status={status} />
				<AccountButton onClick={clickHandler} />
				<LogoutButton onClick={logoutHandler} />
			</ModalContainer>
			<Background onClick={handleModalClose} />
		</Container>
	);
};

export const NotInTeamGithub = () => {
	const status = 'none';
	const clickHandler = () => undefined;
	const logoutHandler = () => undefined;
	const handleModalClose = () => undefined;
	return (
		<Container>
			<ModalContainer>
				<UserInfo user={githubUser} status={status} />
				<AccountButton onClick={clickHandler} />
				<LogoutButton onClick={logoutHandler} />
			</ModalContainer>
			<Background onClick={handleModalClose} />
		</Container>
	);
};

export const InTeam = () => {
	const status = 'green';
	const clickHandler = () => undefined;
	const logoutHandler = () => undefined;
	const handleModalClose = () => undefined;
	return (
		<Container>
			<ModalContainer>
				<UserInfo user={user} status={status} />
				<AccountButton onClick={clickHandler} />
				<LogoutButton onClick={logoutHandler} />
			</ModalContainer>
			<Background onClick={handleModalClose} />
		</Container>
	);
};
