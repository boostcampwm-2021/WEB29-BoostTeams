/* eslint-disable camelcase */

import React from 'react';

import Button from '../../common/Button';

import { TeamCardContainer, TeamCardWrapper, InviteButtonWrapper } from './style';

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
			<TeamCardWrapper>
				<div>
					<img src='#' alt='#' />
				</div>
				<div>{team_name}</div>
			</TeamCardWrapper>
			{type === 'invitation' ? (
				<InviteButtonWrapper>
					<Button text='수락' backgroundColor='' fontColor='' handler={handleClick} />
					<Button text='거절' backgroundColor='' fontColor='' handler={handleClick} />
				</InviteButtonWrapper>
			) : (
				''
			)}
		</TeamCardContainer>
	);
};

export default TeamCard;
