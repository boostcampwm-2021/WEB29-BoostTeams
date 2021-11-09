import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInviteList, userTeamList } from '../../../stores/team';
import TeamCard from '../TeamCard';
import { CardListContainer } from './style';

export interface TeamData {
	team_id: number;
	team_name: string;
	team_desc: string;
}
interface Props {
	type: string;
}

const CardList: React.FC<Props> = ({ type }) => {
	const [list, setList] = type === 'myTeam' ? useRecoilValue(userTeamList) : useRecoilState(userInviteList);
	return (
		<CardListContainer>
			{list.map((team: TeamData) => (
				<TeamCard key={team.team_id} type={type} teamData={team} />
			))}
		</CardListContainer>
	);
};

export default CardList;
