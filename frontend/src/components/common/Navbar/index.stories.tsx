import React from 'react';
import { FaBell, FaCalendarDay, FaChalkboard, FaComments, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Meta } from '@storybook/react';
import Navbar from './index';
import { BellIconWrapper, Container, TabContainer } from './style';

export default {
	title: 'common/Navbar',
	component: Navbar,
} as Meta;

export const Default = () => {
	const teamId = 0;
	return (
		<Container>
			<BellIconWrapper>
				<FaBell />
			</BellIconWrapper>
			<TabContainer>
				<Link to={`/team/${teamId}/board`}>
					<FaChalkboard />
				</Link>
				<Link to={`/team/${teamId}/chat`}>
					<FaComments />
				</Link>
				<Link to={`/team/${teamId}/calendar`}>
					<FaCalendarDay />
				</Link>
				<Link to={`/team/${teamId}/users`}>
					<FaUserFriends />
				</Link>
			</TabContainer>
		</Container>
	);
};
