import { Modal } from '@components/common';
import { signOut } from '@apis/auth';
import useLogout from '@hooks/useLogout';
import { MODAL_THEME } from '@utils/constants';
import React from 'react';
import { Content } from './style';

export interface Props {
	handleModalClose: () => void;
}

const SignOutModal: React.FC<Props> = ({ handleModalClose }) => {
	const logout = useLogout();
	const handleSubmit = () => {
		handleModalClose();
		signOut(() => {
			logout();
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
