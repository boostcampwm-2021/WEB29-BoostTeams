import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { teamListLoadTrigger } from '@stores/team';
import Modal from '@components/common/Modal';
import { leaveTeam, readTeamUsers } from '@apis/team';
import { handleDeleteBtn } from '@utils/team';
import { MODAL_THEME } from '@utils/constants';
import { Container } from '../style';

export interface Props {
	handleModalClose: () => void;
	teamId: number;
}

const ExitTeamModal: React.FC<Props> = ({ handleModalClose, teamId }) => {
	const setLoadTrigger = useSetRecoilState(teamListLoadTrigger);
	const history = useHistory();
	const handleSubmit = async () => {
		const result = await readTeamUsers(teamId);
		if (Object.keys(result).length === 1) handleDeleteBtn(setLoadTrigger, teamId);
		else await leaveTeam(setLoadTrigger, teamId);
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
			<Container>정말 탈퇴하시겠습니까?</Container>
		</Modal>
	);
};

export default ExitTeamModal;
