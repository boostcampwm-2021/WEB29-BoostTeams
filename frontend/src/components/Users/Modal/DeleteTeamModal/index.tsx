import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { teamListLoadTrigger } from '@stores/team';
import { handleDeleteBtn } from '@utils/team';
import { MODAL_THEME } from '@utils/constants';
import Modal from '@components/common/Modal';
import { Container } from '../style';

export interface Props {
	handleModalClose: () => void;
	teamId: number;
}

const DeleteTeamModal: React.FC<Props> = ({ handleModalClose, teamId }) => {
	const setLoadTrigger = useSetRecoilState(teamListLoadTrigger);
	const history = useHistory();
	const handleSubmit = () => {
		handleDeleteBtn(setLoadTrigger, teamId);
		handleModalClose();
		history.push('/');
	};

	return (
		<Modal
			theme={MODAL_THEME.NOTIFICATION}
			handleModalClose={handleModalClose}
			handleSubmit={handleSubmit}
			removeSubmitButton={false}
			title='경고'
			submitBtnName='확인'
			closeBtnName='취소'
		>
			<Container>정말 삭제하시겠습니까?</Container>
		</Modal>
	);
};

export default DeleteTeamModal;
