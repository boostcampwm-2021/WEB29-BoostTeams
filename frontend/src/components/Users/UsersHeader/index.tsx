import React from 'react';
import Thumbnail from '@components/Team/Cards/Thumbnail';
import { UserHeaderContainer, TeamName } from './style';

interface Props {
	teamInfo: any;
}

const UsersHeader: React.FC<Props> = ({ teamInfo }) => {
	return (
		<UserHeaderContainer>
			<Thumbnail team_id={teamInfo?.team_id} team_name={teamInfo?.team_name} />
			<TeamName>{teamInfo?.team_name}</TeamName>
		</UserHeaderContainer>
	);
};

export default UsersHeader;
