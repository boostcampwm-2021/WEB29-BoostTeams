import React from 'react';
import Thumbnail from '@components/Team/Cards/Thumbnail';
import { teamInfoSelector } from '@stores/team';
import { useRecoilValue } from 'recoil';
import { UserHeaderContainer, TeamName } from './style';

interface Props {
	teamId: number;
}

const UsersHeader: React.FC<Props> = ({ teamId }) => {
	const teamInfo = useRecoilValue(teamInfoSelector(teamId));
	return (
		<UserHeaderContainer>
			<Thumbnail team_id={teamInfo?.team_id} team_name={teamInfo?.team_name} />
			<TeamName>{teamInfo?.team_name}</TeamName>
		</UserHeaderContainer>
	);
};

export default UsersHeader;
