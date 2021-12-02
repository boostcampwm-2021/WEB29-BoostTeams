import React from 'react';
import { Meta } from '@storybook/react';
import Navbar, { BoardIcon, CalendarIcon, ChatIcon, UsersIcon } from './index';
import { Container, TabContainer } from './style';

export default {
	title: 'common/Navbar',
	component: Navbar,
} as Meta;

export const Default = () => {
	const teamId = '0';
	const path = '';
	return (
		<Container>
			<TabContainer>
				<BoardIcon teamId={teamId} path={path} />
				<ChatIcon teamId={teamId} path={path} />
				<CalendarIcon teamId={teamId} path={path} />
				<UsersIcon teamId={teamId} path={path} />
			</TabContainer>
		</Container>
	);
};
