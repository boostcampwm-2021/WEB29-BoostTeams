import React from 'react';
import { Link } from 'react-router-dom';

import Thumbnail from './Thumbnail';

import { Container, Name } from './style';

interface Props {
	team_id: number;
	team_name: string;
}

const TeamCard: React.FC<Props> = ({ team_id, team_name }) => {
	return (
		<Link to={`/team/${team_id}/board`}>
			<Container>
				<Thumbnail team_id={team_id} team_name={team_name} />
				<Name>{team_name}</Name>
			</Container>
		</Link>
	);
};

export default TeamCard;
