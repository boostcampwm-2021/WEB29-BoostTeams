import React from 'react';
import Modal from '@src/components/common/Modal';
import { useSetRecoilState } from 'recoil';
import { selectedUser, teamUsersTrigger } from '@stores/team';
import { kickOut } from '@apis/team';
import { useRecoilValue } from 'recoil';
import { Content } from '../style';

interface Props {
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
		<Modal handleModalClose={handleModalClose} handleSubmit={handleSubmit} removeSubmitButton={false}>
			<Content>정말 강퇴하시겠습니까?</Content>
		</Modal>
	);
};

export default KickoutTeamModal;
