import React, { Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';

import userState from '@stores/user';
import useLogout from '@hooks/useLogout';

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
	const user = useRecoilValue(userState);
	const logout = useLogout();

	const logoutHandler = () => {
		logout();
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
