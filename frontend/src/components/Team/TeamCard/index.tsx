import React, { useRef, MouseEvent } from 'react';
import { useHistory } from 'react-router';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { userInviteList, teamListLoadTrigger } from '../../../stores/team';

import { CardData } from '../CardList';

import { joinNewTeam } from '../../../apis/team';

import Button from '../../common/Button';
import { TeamCardContainer, TeamCardImage, TeamCardName, InviteButtonContainer } from './style';

interface Props {
	type: string;
	data: CardData;
}

const TeamCard: React.FC<Props> = ({ type, data }) => {
	const [inviteList, setInviteList] = useRecoilState(userInviteList);
	const setLoadTrigger = useSetRecoilState(teamListLoadTrigger);
	const history = useHistory();
	const cardData = useRef(data);

	const teamChoiceHandler = () => history.push(`team/${cardData.current.team.team_id}/calendar`);
	// recoil selector의 Setter 이용, DB의 team-user에 새로운 record 추가
	const acceptHandler = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		joinNewTeam(setLoadTrigger, cardData);
	};
	const declineHandler = (event: MouseEvent<HTMLButtonElement>) => {
		// https://stackoverflow.com/questions/63357128/recoil-not-persisting-state-when-refreshing-page
		// recoil States는 state 영구적이지 않음, 어떻게 해결 ? local Storage ? DB
		event.stopPropagation();
		const newList = inviteList.filter((team) => team.team_user_id !== cardData.current.team_user_id);
		setInviteList(newList);
	};

	// invitation Card에는 teamChoiceHandler가 등록되면 안 됨 (개선 필요)
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
