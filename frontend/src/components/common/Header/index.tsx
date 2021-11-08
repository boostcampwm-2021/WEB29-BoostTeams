import React, { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useRecoilValue } from 'recoil';

import { Container } from './style';
import { LongLogo } from '../Logo';
import ProfileIcon from '../Icons/ProfileIcon';
import UserState from '../../../stores/user';
import ProfileSimple from './ProfileSimple';

const Header: React.FC = () => {
	const user = useRecoilValue(UserState);
	const [status, setStatus] = useState('green'); // TODO: Socket으로부터 status 받아오기
	const [showProfileSimple, setShowProfileSimple] = useState(false);
	const location = useLocation();

	const handleCloseModal = () => {
		setShowProfileSimple(false);
	};

	const handleOpenModal = () => {
		setShowProfileSimple(true);
	};

	const clickHandler = () => {
		if (showProfileSimple) {
			handleCloseModal();
		} else {
			handleOpenModal();
		}
	};

	useLayoutEffect(() => {
		// TODO: Socket으로부터 status 받아오기
		if (location.pathname === '/team') {
			setStatus('none');
		}
	}, []);

	return (
		<Container>
			<LongLogo />
			<ProfileIcon name={user.name} color={user.state} status={status} onClick={clickHandler} width={3} />
			{showProfileSimple && <ProfileSimple status={status} handleCloseModal={handleCloseModal} />}
		</Container>
	);
};

export default Header;
