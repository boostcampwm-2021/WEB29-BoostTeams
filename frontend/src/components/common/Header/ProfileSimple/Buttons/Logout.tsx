import React from 'react';
import { GrLogout } from 'react-icons/gr';
import { Container } from './style';

type Props = {
	onClick: () => void;
};

const LogoutButton: React.FC<Props> = ({ onClick }) => {
	return (
		<Container onClick={onClick}>
			<GrLogout />
			<span>로그아웃</span>
		</Container>
	);
};

export default LogoutButton;
