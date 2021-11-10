import React from 'react';
import { Link } from 'react-router-dom';

import { Container, ImageWrapper, Name } from './style';

interface Props {
	team_name: string;
	team_id: number;
}

const TeamCard: React.FC<Props> = ({ team_name, team_id }) => {
	return (
		<Link to={`/team/${team_id}/calendar`}>
			<Container>
				<ImageWrapper>
					<img src='/logo.png' alt='/logo.png' />
				</ImageWrapper>
				<Name>{team_name}</Name>
			</Container>
		</Link>
	);
};

export default TeamCard;
