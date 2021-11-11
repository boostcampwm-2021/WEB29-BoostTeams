import React from 'react';
import { FaBell, FaChalkboard, FaComments, FaCalendarDay, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Container, BellIconWrapper, TabContainer, TeamIconContainer, TeamIcon } from './style';
import { PrimaryPalette } from '../../../utils/constants';
import { userTeamList } from '../../../stores/team';
import { CardData } from '../../Team/type';

const Navbar: React.FC = () => {
	const path = window.location.pathname.match(/\/team\/[0-9]+/)![0];
	const teamList = useRecoilValue(userTeamList);
	const myTeamList: CardData[] = [];
	teamList.reduce((pre: void, team: CardData) => {
		if (team.state) myTeamList.push(team);
		return pre;
	}, '');
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
				{myTeamList.map((e) => (
					<Link key={e.team.team_id} to={`/team/${e.team.team_id}/calendar`}>
						<TeamIcon key={e.team.team_id} color={PrimaryPalette[e.team.team_id % 6]}>
							{e.team.team_name[0].toUpperCase()}
						</TeamIcon>
					</Link>
				))}
			</TeamIconContainer>
		</Container>
	);
};

export default Navbar;
