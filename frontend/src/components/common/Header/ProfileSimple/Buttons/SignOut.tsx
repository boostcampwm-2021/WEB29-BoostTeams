import React from 'react';
import { GrLogout } from 'react-icons/gr';
import { Container } from './style';

type Props = {
	onClick: () => void;
};

const SignOutButton: React.FC<Props> = ({ onClick }) => {
	return (
		<Container onClick={onClick}>
			<GrLogout />
			<span>탈퇴</span>
		</Container>
	);
};

export default SignOutButton;
