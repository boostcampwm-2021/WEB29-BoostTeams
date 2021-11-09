/* eslint-disable camelcase */

import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInviteList, userTeamList } from '../../../stores/team';
import TeamCard from '../TeamCard';
import { CardListContainer } from './style';

interface TeamData {
	team_id: number;
	team_name: string;
	team_desc: string;
}
interface Props {
	dummy: TeamData[];
	type: string;
}

const CardList: React.FC<Props> = ({ dummy, type }) => {
	// const teamList = type === 'myTeam' ? useRecoilValue(userTeamList) : useRecoilState(userInviteList); // 개선 필요
	const teamList = dummy;
	return (
		<CardListContainer>
			{teamList.map((team: TeamData) => (
				<TeamCard key={team.team_id} type={type} team_name={team.team_name} />
			))}
		</CardListContainer>
	);
};

export default CardList;
