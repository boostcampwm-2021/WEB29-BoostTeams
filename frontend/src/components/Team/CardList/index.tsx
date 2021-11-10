import React from 'react';

import { useRecoilValue } from 'recoil';
import { userInviteList, userTeamList } from '../../../stores/team';

import TeamCard from '../TeamCard';
import { CardListContainer } from './style';

interface TeamData {
	team_id: number;
	team_name: string;
	team_desc: string;
}
export interface CardData {
	team_user_id: number;
	team: TeamData;
}
interface Props {
	type: string;
}

const CardList: React.FC<Props> = ({ type }) => {
	const teamList = useRecoilValue(type === 'myTeam' ? userTeamList : userInviteList);
	return (
		<CardListContainer>
			{teamList.map((team: CardData) => (
				<TeamCard key={team.team_user_id} type={type} data={team} />
			))}
		</CardListContainer>
	);
};

export default CardList;
