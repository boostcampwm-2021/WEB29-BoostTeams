import React, { useRef, MouseEvent } from 'react';
import { useHistory } from 'react-router';

import { CardData } from '../CardList';

import Button from '../../common/Button';

import { TeamCardContainer, TeamCardImage, TeamCardName, InviteButtonContainer } from './style';

export interface teamCardType {
	type: string;
	data: CardData;
}

const TeamCard: React.FC<teamCardType> = ({ type, data }) => {
	const history = useHistory();
	const cardData = useRef(data);

	const teamChoiceHandler = () => history.push(`team/${cardData.current.team.team_id}/calendar`);
	// recoil selector의 Setter 이용, DB의 team-user에 새로운 record 추가
	const acceptHandler = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
	};
	// recoil atom의 배열에서 제거
	const declineHandler = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
	};

	// invitation Card는 클릭되면 안 됨
	return (
		<TeamCardContainer onClick={teamChoiceHandler}>
			<TeamCardImage>
				<img src='/logo.png' alt='/logo.png' />
			</TeamCardImage>
			<TeamCardName>{cardData.current.team.team_name}</TeamCardName>
			{type === 'invitation' ? (
				<InviteButtonContainer>
					<Button text='수락' backgroundColor='' fontColor='' handler={acceptHandler} />
					<Button text='거절' backgroundColor='' fontColor='' handler={declineHandler} />
				</InviteButtonContainer>
			) : (
				''
			)}
		</TeamCardContainer>
	);
};

export default TeamCard;
