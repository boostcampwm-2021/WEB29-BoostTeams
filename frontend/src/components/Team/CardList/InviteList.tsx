import React from 'react';
import { InviteCard } from '../Cards';
import { CardData } from '../type';
import { Container, Title, CardListContainer } from './style';

interface Props {
	list: CardData[];
}

const InviteList: React.FC<Props> = ({ list }) => {
	return (
		<Container>
			<Title>초대 목록</Title>
			<CardListContainer>
				{list.map((team: CardData) => (
					<InviteCard key={team.team_user_id} teamName={team.team.team_name} teamId={team.team.team_id} />
				))}
			</CardListContainer>
		</Container>
	);
};

export default InviteList;
