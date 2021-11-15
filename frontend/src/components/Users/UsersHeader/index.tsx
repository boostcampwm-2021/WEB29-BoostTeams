import React from 'react';
import Thumbnail from '@components/Team/Cards/Thumbnail';
import { UserHeaderContainer, Teamname } from './style';

interface Props {
	teamInfo: any;
}

const UsersHeader: React.FC<Props> = ({ teamInfo }) => {
	return (
		<UserHeaderContainer>
			<Thumbnail team_id={teamInfo.teamId} team_name={teamInfo.teamName} />
			<Teamname>{teamInfo.teamName}</Teamname>
		</UserHeaderContainer>
	);
};

export default UsersHeader;
