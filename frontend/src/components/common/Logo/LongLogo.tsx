import React from 'react';
import { Link } from 'react-router-dom';

import { Wrapper } from './style';

const LongLogo: React.FC = () => {
	return (
		<Wrapper>
			<Link to='/'>
				<img src='/logo.png' alt='logo' />
				BoostTeams
			</Link>
		</Wrapper>
	);
};

export default LongLogo;
