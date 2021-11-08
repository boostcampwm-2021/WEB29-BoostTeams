import React from 'react';
import { useHistory } from 'react-router';

import { Wrapper } from './style';

const LongLogo: React.FC = () => {
	const history = useHistory();

	const linkHome = (e: any) => {
		e.preventDefault();
		// history.push('/');
	};

	return (
		<Wrapper>
			<a href='/' onClick={linkHome}>
				<img src='logo.png' alt='logo' />
				BoostTeams
			</a>
		</Wrapper>
	);
};

export default LongLogo;
