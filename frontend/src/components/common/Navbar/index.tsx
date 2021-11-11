import React from 'react';
import { FaBell, FaChalkboard, FaComments, FaCalendarDay, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container, BellIconWrapper, TabContainer, TeamIconContainer, TeamIcon } from './style';
import { PrimaryPalette } from '../../../utils/constants';

const Navbar: React.FC = () => {
	const path = window.location.pathname.match(/\/team\/[0-9]+/)![0];
	const teamDummy = [
		{ team_id: 1, name: 'boost' },
		{ team_id: 2, name: 'example' },
		{ team_id: 3, name: 'test' },
	];
	return (
		<Container>
			<BellIconWrapper>
				<FaBell />
			</BellIconWrapper>
			<TabContainer>
				<Link to={`${path}/board`}>
					<FaChalkboard />
				</Link>
				<Link to={`${path}/chat`}>
					<FaComments />
				</Link>
				<Link to={`${path}/calendar`}>
					<FaCalendarDay />
				</Link>
				<Link to={`${path}/setting`}>
					<FaUserFriends />
				</Link>
			</TabContainer>
			<TeamIconContainer>
				{teamDummy.map((e) => (
					<TeamIcon key={e.team_id} color={PrimaryPalette[e.team_id % 6]}>
						{e.name[0].toUpperCase()}
					</TeamIcon>
				))}
			</TeamIconContainer>
		</Container>
	);
};

export default Navbar;
