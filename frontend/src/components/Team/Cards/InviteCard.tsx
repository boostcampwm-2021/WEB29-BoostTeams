import React from 'react';
import { useSetRecoilState } from 'recoil';
import { joinNewTeam } from '../../../apis/team';
import { teamListLoadTrigger } from '../../../stores/team';
import { ColorCode } from '../../../utils/constants';
import Button from '../../common/Button';

import { Container, ImageWrapper, InviteButtonContainer, Name } from './style';

interface Props {
	teamName: string;
	teamId: number;
}

const InviteCard: React.FC<Props> = ({ teamName, teamId }) => {
	const setLoadTrigger = useSetRecoilState(teamListLoadTrigger);
	const acceptHandler = () => {
		joinNewTeam(setLoadTrigger, teamId);
	};
	const declineHandler = () => {
		// TODO: team-user 테이블에서 삭제하는 API
	};

	return (
		<Container>
			<ImageWrapper>
				<img src='/logo.png' alt='/logo.png' />
			</ImageWrapper>
			<Name>{teamName}</Name>
			<InviteButtonContainer>
				<Button text='수락' backgroundColor={ColorCode.PRIMARY1} fontColor={ColorCode.WHITE} handler={acceptHandler} />
				<Button text='거절' backgroundColor='' fontColor='' handler={declineHandler} />
			</InviteButtonContainer>
		</Container>
	);
};

export default InviteCard;
