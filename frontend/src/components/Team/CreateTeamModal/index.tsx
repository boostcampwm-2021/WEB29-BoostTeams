import React from 'react';

import Modal from '../../common/Modal';

type Props = {
	handleModalClose: () => void;
};

const CreateTeamModal: React.FC<Props> = ({ handleModalClose }) => {
	const handleSubmit = () => {
		// TODO: 팀 생성하는 API 호출
	};
	return (
		<Modal handleModalClose={handleModalClose} handleSubmit={handleSubmit} removeSubmitButton={false}>
			<span>Create Team Modal</span>
		</Modal>
	);
};

export default CreateTeamModal;
