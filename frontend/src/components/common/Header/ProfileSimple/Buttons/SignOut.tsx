import React from 'react';
import { FaUserTimes } from 'react-icons/fa';
import { Container } from './style';

type Props = {
	onClick: () => void;
};

const SignOutButton: React.FC<Props> = ({ onClick }) => {
	return (
		<Container onClick={onClick}>
			<FaUserTimes />
			<span>탈퇴</span>
		</Container>
	);
};

export default SignOutButton;
