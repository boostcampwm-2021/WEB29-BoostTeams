/* eslint-disable camelcase */

import React from 'react';

import Button from '../../common/Button';

import { TeamCardContainer, TeamCardImage, TeamCardName, InviteButtonContainer } from './style';

export interface teamCardType {
	type: string;
	team_name: string;
}

const TeamCard: React.FC<teamCardType> = ({ type, team_name }) => {
	const handleClick = () => {
		console.log('hi');
	};

	return (
		<TeamCardContainer>
			<TeamCardImage>
				<img src='/logo.png' alt='/logo.png' />
			</TeamCardImage>
			<TeamCardName>{team_name}</TeamCardName>
			{type === 'invitation' ? (
				<InviteButtonContainer>
					<Button text='수락' backgroundColor='' fontColor='' handler={handleClick} />
					<Button text='거절' backgroundColor='' fontColor='' handler={handleClick} />
				</InviteButtonContainer>
			) : (
				''
			)}
		</TeamCardContainer>
	);
};

export default TeamCard;
