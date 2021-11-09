import React, { useRef, MouseEvent } from 'react';
import { useHistory } from 'react-router';

import { TeamData } from '../CardList';

import Button from '../../common/Button';

import { TeamCardContainer, TeamCardImage, TeamCardName, InviteButtonContainer } from './style';

export interface teamCardType {
	type: string;
	teamData: TeamData;
}

const TeamCard: React.FC<teamCardType> = ({ type, teamData }) => {
	const history = useHistory();
	const cardData = useRef(teamData);

	const teamChoiceHandler = () => {
		history.push(`team/${cardData.current.team_id}/calendar`);
	};
	// recoil selector의 Setter 이용, DB의 team-user에 새로운 record 추가
	const acceptHandler = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		console.log('accept');
	};
	// recoil atom의 배열에서 제거
	const declineHandler = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		console.log(cardData.current.team_id);
	};

	return (
		<TeamCardContainer onClick={teamChoiceHandler}>
			<TeamCardImage>
				<img src='/logo.png' alt='/logo.png' />
			</TeamCardImage>
			<TeamCardName>{teamData.team_name}</TeamCardName>
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
