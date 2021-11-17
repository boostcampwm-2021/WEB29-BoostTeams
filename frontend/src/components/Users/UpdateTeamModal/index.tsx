import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { teamListLoadTrigger } from '@src/stores/team';
import Modal from '@src/components/common/Modal';
import { leaveTeam } from '@apis/team';
import { Content } from './style';

interface Props {
	handleModalClose: () => void;
	teamId: number;
}

const UpdateTeamModal: React.FC<Props> = ({ handleModalClose, teamId }) => {
	const setLoadTrigger = useSetRecoilState(teamListLoadTrigger);
	const history = useHistory();
	const handleSubmit = async () => {
		console.log('update');
	};
	return (
		<Modal handleModalClose={handleModalClose} handleSubmit={handleSubmit} removeSubmitButton={false}>
			<Content>update</Content>
		</Modal>
	);
};

export default UpdateTeamModal;
