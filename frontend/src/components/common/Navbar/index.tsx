import React from 'react';
import { FaChalkboard, FaComments, FaCalendarDay, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { PrimaryPalette } from '@utils/constants';
import { userTeamList } from '@stores/team';
import { CardData } from '@components/Team/type';
import { Container, TabContainer, TeamIconContainer, TeamIcon, IconWrapper } from './style';

interface Props {
	teamId: string;
	path: string;
}

export const BoardIcon: React.FC<Props> = ({ teamId, path }) => {
	return (
		<Link to={`/team/${teamId}/board`} aria-label='Board'>
			<IconWrapper isHere={path === 'board'}>
				<FaChalkboard />
			</IconWrapper>
		</Link>
	);
};

export const ChatIcon: React.FC<Props> = ({ teamId, path }) => {
	return (
		<Link to={`/team/${teamId}/chat`} aria-label='Chat'>
			<IconWrapper isHere={path === 'chat'}>
				<FaComments />
			</IconWrapper>
		</Link>
	);
};

export const CalendarIcon: React.FC<Props> = ({ teamId, path }) => {
	return (
		<Link to={`/team/${teamId}/calendar`} aria-label='Calendar'>
			<IconWrapper isHere={path === 'calendar'}>
				<FaCalendarDay />
			</IconWrapper>
		</Link>
	);
};

export const UsersIcon: React.FC<Props> = ({ teamId, path }) => {
	return (
		<Link to={`/team/${teamId}/users`} aria-label='Users'>
			<IconWrapper isHere={path === 'users'}>
				<FaUserFriends />
			</IconWrapper>
		</Link>
	);
};

const Navbar: React.FC = () => {
	const { teamId, path } = window.location.pathname.match(/\/team\/(?<teamId>\d+)\/(?<path>\w+)/)?.groups ?? {
		teamId: '',
		path: '',
	};
	const teamList = useRecoilValue(userTeamList);
	const myTeamList: CardData[] = [];
	teamList.reduce((pre: void, team: CardData) => {
		if (team.state) myTeamList.push(team);
		return pre;
	}, '');
	return (
		<Container>
			<TabContainer>
				<BoardIcon teamId={teamId} path={path} />
				<ChatIcon teamId={teamId} path={path} />
				<CalendarIcon teamId={teamId} path={path} />
				<UsersIcon teamId={teamId} path={path} />
			</TabContainer>
			<TeamIconContainer>
				{myTeamList.map((e) => (
					<Link key={e.team.team_id} to={`/team/${e.team.team_id}/${path}`} aria-label={e.team.team_name}>
						<TeamIcon
							key={e.team.team_id}
							color={PrimaryPalette[e.team.team_id % 6]}
							isHere={Number(teamId) === e.team.team_id}
						>
							{e.team.team_name[0].toUpperCase()}
						</TeamIcon>
					</Link>
				))}
			</TeamIconContainer>
		</Container>
	);
};

export default Navbar;
