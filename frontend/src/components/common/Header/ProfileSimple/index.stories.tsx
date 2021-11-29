import React from 'react';
import { Meta } from '@storybook/react';
import ProfileSimple from './index';
import { Background, Container, ModalContainer } from './style';
import UserInfo from './UserInfo';
import { AccountButton, LogoutButton, SignOutButton } from './Buttons';

export default {
	title: 'common/Profile',
	component: ProfileSimple,
} as Meta;

const user = {
	name: 'boostteams',
	email: 'boostteams@boostcamp.com',
	color: 0,
};

const githubUser = {
	name: 'boostteams',
	email: 'boostteams@boostcamp.com',
	color: 0,
	github_id: 'sccID',
	github_name: 'sccName',
};

export const NotInTeam = () => {
	const status = 'none';
	const clickHandler = () => undefined;
	const logoutHandler = () => undefined;
	const signOutHandler = () => undefined;
	const handleModalClose = () => undefined;
	return (
		<Container>
			<ModalContainer>
				<UserInfo user={user} status={status} />
				<AccountButton onClick={clickHandler} />
				<LogoutButton onClick={logoutHandler} />
				<SignOutButton onClick={signOutHandler} />
			</ModalContainer>
			<Background onClick={handleModalClose} />
		</Container>
	);
};

export const NotInTeamGithub = () => {
	const status = 'none';
	const clickHandler = () => undefined;
	const logoutHandler = () => undefined;
	const signOutHandler = () => undefined;
	const handleModalClose = () => undefined;
	return (
		<Container>
			<ModalContainer>
				<UserInfo user={githubUser} status={status} />
				<AccountButton onClick={clickHandler} />
				<LogoutButton onClick={logoutHandler} />
				<SignOutButton onClick={signOutHandler} />
			</ModalContainer>
			<Background onClick={handleModalClose} />
		</Container>
	);
};

export const InTeam = () => {
	const status = 'green';
	const clickHandler = () => undefined;
	const logoutHandler = () => undefined;
	const signOutHandler = () => undefined;
	const handleModalClose = () => undefined;
	return (
		<Container>
			<ModalContainer>
				<UserInfo user={user} status={status} />
				<AccountButton onClick={clickHandler} />
				<LogoutButton onClick={logoutHandler} />
				<SignOutButton onClick={signOutHandler} />
			</ModalContainer>
			<Background onClick={handleModalClose} />
		</Container>
	);
};
