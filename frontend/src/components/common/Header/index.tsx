import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import userState from '@stores/user';

import { Container } from './style';
import { LongLogo } from '../Logo';
import ProfileIcon from '../Icons/ProfileIcon';
import ProfileSimple from './ProfileSimple';

const Header: React.FC = () => {
	const user = useRecoilValue(userState);
	const [showProfileSimple, setShowProfileSimple] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showSignOutModal, setShowSignOutModal] = useState(false);
	const handleModalClose = () => {
		setShowProfileSimple(false);
		setShowUpdateModal(false);
	};

	const handleModalOpen = () => {
		setShowProfileSimple(true);
	};

	const clickHandler = () => {
		if (showProfileSimple) {
			handleModalClose();
		} else {
			handleModalOpen();
		}
	};

	return (
		<Container>
			<LongLogo />
			<ProfileIcon name={user.name} color={user.color} status='online' onClick={clickHandler} width={3} />
			{showProfileSimple && (
				<ProfileSimple
					status='none'
					handleModalClose={handleModalClose}
					showUpdateModal={showUpdateModal}
					showSignOutModal={showSignOutModal}
					setShowUpdateModal={setShowUpdateModal}
					setShowSignOutModal={setShowSignOutModal}
				/>
			)}
		</Container>
	);
};

export default Header;
