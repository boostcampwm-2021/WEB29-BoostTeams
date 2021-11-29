import React, { Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import userState from '@stores/user';
import { logout } from '@apis/auth';

import UserInfo from './UserInfo';
import UpdateModal from './Modals/UpdateModal';
import { AccountButton, LogoutButton, SignOutButton } from './Buttons';

import { Background, Container, ModalContainer } from './style';
import SignOutModal from './Modals/SignOutModal';

interface ProfileSimpleProps {
	status: string;
	showUpdateModal: boolean;
	showSignOutModal: boolean;
	setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
	setShowSignOutModal: Dispatch<SetStateAction<boolean>>;
	handleModalClose: () => void;
}

const ProfileSimple: React.FC<ProfileSimpleProps> = ({
	status,
	showUpdateModal,
	showSignOutModal,
	setShowUpdateModal,
	setShowSignOutModal,
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

	const signOutHandler = () => {
		handleSignOutModalOpen();
	};

	const handleUpdateModalClose = () => setShowUpdateModal(false);
	const handleUpdateModalOpen = () => setShowUpdateModal(true);
	const handleSignOutModalClose = () => setShowSignOutModal(false);
	const handleSignOutModalOpen = () => setShowSignOutModal(true);

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
				<SignOutButton onClick={signOutHandler} />
			</ModalContainer>
			{showUpdateModal && <UpdateModal handleModalClose={handleUpdateModalClose} />}
			{showSignOutModal && <SignOutModal handleModalClose={handleSignOutModalClose} />}
			<Background onClick={handleModalClose} />
		</Container>
	);
};

export default ProfileSimple;
