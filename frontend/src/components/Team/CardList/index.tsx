/* eslint-disable camelcase */

import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInviteList, userTeamList } from '../../../stores/team';
import TeamCard from '../TeamCard';
import { CardListContainer } from './style';

interface Props {
	type: string;
}

interface TeamData {
	team_id: number;
	team_name: string;
	team_desc: string;
}

const CardList: React.FC<Props> = ({ type }) => {
	const teamList = type === 'myTeam' ? useRecoilValue(userTeamList) : useRecoilState(userInviteList); // 개선 필요
	const teamCards = teamList.map((team: TeamData) => <TeamCard type={type} team_name={team.team_name} />);
	return <CardListContainer>{teamCards}</CardListContainer>;
};

export default CardList;
