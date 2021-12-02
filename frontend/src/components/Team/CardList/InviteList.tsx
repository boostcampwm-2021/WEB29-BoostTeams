import React from 'react';
import { InviteCard } from '../Cards';
import { CardData } from '../type';
import { InviteContainer, Title, CardListContainer } from './style';

interface Props {
	list: CardData[];
}

const InviteList: React.FC<Props> = ({ list }) => {
	return (
		<InviteContainer>
			<Title>초대 목록</Title>
			<CardListContainer>
				{list.map((team: CardData) => (
					<InviteCard key={team.team_user_id} team_id={team.team.team_id} team_name={team.team.team_name} />
				))}
			</CardListContainer>
		</InviteContainer>
	);
};

export default InviteList;
