import React, { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useRecoilValue } from 'recoil';
import UserState from '@stores/user';

import { Container } from './style';
import { LongLogo } from '../Logo';
import ProfileIcon from '../Icons/ProfileIcon';
import ProfileSimple from './ProfileSimple';

const Header: React.FC = () => {
	const user = useRecoilValue(UserState);
	const [showProfileSimple, setShowProfileSimple] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const location = useLocation();

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
			<ProfileIcon name={user.name} color={user.state} status='online' onClick={clickHandler} width={3} />
			{showProfileSimple && (
				<ProfileSimple
					status='online'
					handleModalClose={handleModalClose}
					showUpdateModal={showUpdateModal}
					setShowUpdateModal={setShowUpdateModal}
				/>
			)}
		</Container>
	);
};

export default Header;
