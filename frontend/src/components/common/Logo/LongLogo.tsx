import React from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '@images/logo.png';
import { Wrapper } from './style';

const LongLogo: React.FC = () => {
	return (
		<Wrapper>
			<Link to='/'>
				<img src={LogoImg} alt='logo' />
				BoostTeams
			</Link>
		</Wrapper>
	);
};

export default LongLogo;
