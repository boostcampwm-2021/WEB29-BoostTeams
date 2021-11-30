import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import { inviteUser } from '@apis/team';
import Modal from '@components/common/Modal';
import { Input } from '@components/common/Modal/style';

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
		<Modal
			title='팀 초대'
			handleModalClose={handleModalClose}
			handleSubmit={handleSubmit}
			removeSubmitButton={false}
			submitBtnName='초대'
		>
			<Input type='text' placeholder='초대할 유저 닉네임 입력' ref={inputRef} />
		</Modal>
	);
};

export default InviteUserModal;
