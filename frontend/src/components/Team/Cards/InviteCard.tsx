import React from 'react';
import { useSetRecoilState } from 'recoil';
import { accept, decline } from '@apis/team';
import { teamListLoadTrigger } from '@stores/team';
import { ColorCode } from '@utils/constants';
import Button from '@components/common/Button';
import Thumbnail from './Thumbnail';

import { Container, InviteButtonContainer, Name } from './style';

interface Props {
	team_id: number;
	team_name: string;
}

const InviteCard: React.FC<Props> = ({ team_id, team_name }) => {
	const setLoadTrigger = useSetRecoilState(teamListLoadTrigger);
	const acceptHandler = () => {
		accept(setLoadTrigger, team_id);
	};
	const declineHandler = () => {
		decline(setLoadTrigger, team_id);
	};

	return (
		<Container>
			<Thumbnail team_id={team_id} team_name={team_name} />
			<Name>{team_name}</Name>
			<InviteButtonContainer>
				<Button text='수락' backgroundColor={ColorCode.PRIMARY1} fontColor={ColorCode.WHITE} handler={acceptHandler} />
				<Button text='거절' backgroundColor='' fontColor='' handler={declineHandler} />
			</InviteButtonContainer>
		</Container>
	);
};

export default InviteCard;
