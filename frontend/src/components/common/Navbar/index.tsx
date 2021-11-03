import React from 'react';
import { FaBell, FaChalkboard, FaComments, FaCalendarDay, FaUserFriends } from 'react-icons/fa';
import { Container, BellIconWrapper, TabContainer, TeamIconContainer, TeamIcon } from './style';

const Navbar: React.FC = () => {
	return (
		<Container>
			<BellIconWrapper>
				<FaBell />
			</BellIconWrapper>
			<TabContainer>
				<FaChalkboard />
				<FaComments />
				<FaCalendarDay />
				<FaUserFriends />
			</TabContainer>
			<TeamIconContainer>
				<TeamIcon />
				<TeamIcon />
			</TeamIconContainer>
		</Container>
	);
};

export default Navbar;
