import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { teamListLoadTrigger } from '@stores/team';
import { handleDeleteBtn } from '@utils/team';
import Modal from '@components/common/Modal';
import { Content } from '../style';

interface Props {
	handleModalClose: () => void;
	teamId: number;
}

const ExitTeamModal: React.FC<Props> = ({ handleModalClose, teamId }) => {
	const setLoadTrigger = useSetRecoilState(teamListLoadTrigger);
	const history = useHistory();

	const handleSubmit = () => {
		handleDeleteBtn(setLoadTrigger, teamId);
		history.push('/');
	};

	return (
		<Modal handleModalClose={handleModalClose} handleSubmit={handleSubmit} removeSubmitButton={false}>
			<Content>정말 삭제하시겠습니까?</Content>
		</Modal>
	);
};

export default ExitTeamModal;
