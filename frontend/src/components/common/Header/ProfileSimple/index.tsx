import React, { Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import userState from '@stores/user';
import { logout } from '@apis/auth';

import UserInfo from './UserInfo';
import UpdateModal from './UpdateModal';
import { AccountButton, LogoutButton } from './Buttons';

import { Background, Container, ModalContainer } from './style';

interface ProfileSimpleProps {
	status: string;
	showUpdateModal: boolean;
	setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
	handleModalClose: () => void;
}

const ProfileSimple: React.FC<ProfileSimpleProps> = ({
	status,
	showUpdateModal,
	setShowUpdateModal,
	handleModalClose,
}) => {
	const history = useHistory();
	const user = useRecoilValue(userState);

	const logoutHandler = () => {
		logout(() => {
			toast.success('😎 로그아웃 성공');
			history.push('/');
		});
	};

	const handleUpdateModalClose = () => {
		setShowUpdateModal(false);
	};

	const handleUpdateModalOpen = () => {
		setShowUpdateModal(true);
	};

	const clickHandler = () => {
		if (showUpdateModal) {
			handleUpdateModalClose();
		} else {
			handleUpdateModalOpen();
		}
	};

	return (
		<Container>
			<ModalContainer>
				<UserInfo user={user} status={status} />
				<AccountButton onClick={clickHandler} />
				<LogoutButton onClick={logoutHandler} />
			</ModalContainer>
			{showUpdateModal && <UpdateModal handleModalClose={handleUpdateModalClose} />}
			<Background onClick={handleModalClose} />
		</Container>
	);
};

export default ProfileSimple;
