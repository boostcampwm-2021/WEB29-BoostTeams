import React from 'react';
import Modal from '@src/components/common/Modal';
import { useResetRecoilState } from 'recoil';
import { teamListLoadTrigger } from '@stores/team';
import { kickOut } from '@apis/team';
import { useRecoilValue } from 'recoil';
import { selectedUser } from '@src/stores/team';
import { Content } from '../style';

interface Props {
	handleModalClose: () => void;
	teamId: number;
	deleteUserById: (id: number) => void;
}

const KickoutTeamModal: React.FC<Props> = ({ handleModalClose, teamId, deleteUserById }) => {
	const { id } = useRecoilValue(selectedUser);
	const setLoadTrigger = useResetRecoilState(teamListLoadTrigger);
	const handleSubmit = async () => {
		handleModalClose();
		await kickOut(setLoadTrigger, id, teamId);
		deleteUserById(id);
	};
	return (
		<Modal handleModalClose={handleModalClose} handleSubmit={handleSubmit} removeSubmitButton={false}>
			<Content>정말 강퇴하시겠습니까?</Content>
		</Modal>
	);
};

export default KickoutTeamModal;
