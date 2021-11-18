import React from 'react';
import { FaBell, FaChalkboard, FaComments, FaCalendarDay, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { PrimaryPalette } from '@utils/constants';
import { userTeamList } from '@stores/team';
import { CardData } from '@components/Team/type';
import { Container, BellIconWrapper, TabContainer, TeamIconContainer, TeamIcon } from './style';

const Navbar: React.FC = () => {
	const groups = window.location.pathname.match(/\/team\/(?<teamId>\d+)\/(?<path>\w+)/)?.groups;
	const { teamId, path }: any = groups;
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
			<TeamIconContainer>
				{myTeamList.map((e) => (
					<Link key={e.team.team_id} to={`/team/${e.team.team_id}/${path}`}>
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
