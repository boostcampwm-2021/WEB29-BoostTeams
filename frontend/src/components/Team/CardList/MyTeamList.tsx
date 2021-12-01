import React from 'react';
import { TeamCard, CreateCard } from '../Cards';
import { CardData } from '../type';
import { MyTeamContainer, Title, CardListContainer } from './style';

interface Props {
	list: CardData[];
	handleModalOpen: () => void;
}

const MyTeamList: React.FC<Props> = ({ list, handleModalOpen }) => {
	return (
		<MyTeamContainer>
			<Title>내 팀</Title>
			<CardListContainer>
				{list.map((team: CardData) => (
					<TeamCard key={team.team_user_id} team_name={team.team.team_name} team_id={team.team.team_id} />
				))}
				<CreateCard onClick={handleModalOpen} />
			</CardListContainer>
		</MyTeamContainer>
	);
};

export default MyTeamList;
