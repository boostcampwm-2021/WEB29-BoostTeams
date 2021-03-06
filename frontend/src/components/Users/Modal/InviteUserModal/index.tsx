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
			toast.warn('π£ μ μ  λλ€μμ μλ ₯ν΄μ£ΌμΈμ!');
			return;
		}
		await inviteUser(teamId, inputRef.current.value);
		handleModalClose();
	};

	return (
		<Modal
			title='ν μ΄λ'
			handleModalClose={handleModalClose}
			handleSubmit={handleSubmit}
			removeSubmitButton={false}
			submitBtnName='μ΄λ'
		>
			<Input type='text' placeholder='μ΄λν  μ μ  λλ€μ μλ ₯' ref={inputRef} />
		</Modal>
	);
};

export default InviteUserModal;
