import React from 'react';
import Modal from '@components/common/Modal';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedUser, teamUsersTrigger } from '@stores/team';
import { kickOut } from '@apis/team';
import { MODAL_THEME } from '@utils/constants';
import { Container } from '../style';

export interface Props {
	handleModalClose: () => void;
	teamId: number;
}

const KickoutTeamModal: React.FC<Props> = ({ handleModalClose, teamId }) => {
	const { id } = useRecoilValue(selectedUser);
	const setTeamUsersTrigger = useSetRecoilState(teamUsersTrigger);
	const handleSubmit = async () => {
		handleModalClose();
		await kickOut(setTeamUsersTrigger, id, teamId);
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
			<Container>정말 강퇴하시겠습니까?</Container>
		</Modal>
	);
};

export default KickoutTeamModal;
