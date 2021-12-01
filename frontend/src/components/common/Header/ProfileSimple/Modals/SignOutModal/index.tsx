import { Modal } from '@components/common';
import { MODAL_THEME } from '@utils/constants';
import React from 'react';
import { signOut } from '@src/apis/user';
import { useHistory } from 'react-router';
import { logout } from '@apis/auth';
import { toast } from 'react-toastify';
import { Content } from './style';

export interface Props {
	handleModalClose: () => void;
}

const SignOutModal: React.FC<Props> = ({ handleModalClose }) => {
	const history = useHistory();
	const handleSubmit = () => {
		handleModalClose();
		signOut();
		logout(() => {
			history.push('/');
			toast.success('😣 회원탈퇴 성공');
		});
	};
	return (
		<Modal
			theme={MODAL_THEME.NOTIFICATION}
			title='경고'
			removeSubmitButton={false}
			handleModalClose={handleModalClose}
			handleSubmit={handleSubmit}
			submitBtnName='확인'
			closeBtnName='취소'
		>
			<Content>회원 탈퇴하시겠습니까?</Content>
		</Modal>
	);
};

export default SignOutModal;
