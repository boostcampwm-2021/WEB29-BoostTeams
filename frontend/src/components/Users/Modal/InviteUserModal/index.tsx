import React, { useRef } from 'react';
import { inviteUser } from '@apis/team';
import { toast } from 'react-toastify';

import Modal from '@components/common/Modal';
import { InputContainer, Input, Title } from '../style';

export interface Props {
	teamId: number;
	handleModalClose: () => void;
}

const InviteUserModal: React.FC<Props> = ({ teamId, handleModalClose }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const handleSubmit = async () => {
		if (!inputRef.current) return;
		if (inputRef.current.value === '') {
			toast.warn('😣 유저 닉네임을 입력해주세요!');
			return;
		}
		await inviteUser(teamId, inputRef.current.value);
		handleModalClose();
	};

	return (
		<Modal handleModalClose={handleModalClose} handleSubmit={handleSubmit} removeSubmitButton={false}>
			<InputContainer>
				<Title>팀 초대</Title>
				<Input type='text' placeholder='초대할 유저 닉네임 입력' ref={inputRef} />
			</InputContainer>
		</Modal>
	);
};

export default InviteUserModal;
