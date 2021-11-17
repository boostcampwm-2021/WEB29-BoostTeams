import React from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '@src/components/common/Modal';
import { leaveTeam } from '@apis/team';
import { Content } from './style';

interface Props {
	handleModalClose: () => void;
	teamId: number;
}

const UserModal: React.FC<Props> = ({ handleModalClose, teamId }) => {
	const history = useHistory();
	const handleSubmit = async () => {
		const result = await leaveTeam(teamId);
		history.push('/');
	};
	return (
		<Modal handleModalClose={handleModalClose} handleSubmit={handleSubmit} removeSubmitButton={false}>
			<Content>정말 탈퇴하시겠습니까?</Content>
		</Modal>
	);
};

export default UserModal;