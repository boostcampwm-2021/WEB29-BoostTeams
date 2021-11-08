import React, { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useRecoilValue } from 'recoil';

import { Container } from './style';
import { LongLogo } from '../Logo';
import ProfileIcon from '../Icons/ProfileIcon';
import UserState from '../../../stores/user';

const Header: React.FC = () => {
	const user = useRecoilValue(UserState);
	const shortenName = user.name[0];
	const [status, setStatus] = useState('green'); // TODO: Socket으로부터 status 받아오기
	const location = useLocation();

	useLayoutEffect(() => {
		// TODO: Socket으로부터 status 받아오기
		if (location.pathname === '/team') {
			setStatus('none');
		}
	}, []);

	return (
		<Container>
			<LongLogo />
			<ProfileIcon name={shortenName} color={user.state} status={status} />
		</Container>
	);
};

export default Header;
