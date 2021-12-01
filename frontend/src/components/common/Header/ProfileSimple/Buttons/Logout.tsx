import React from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { Container } from './style';

type Props = {
	onClick: () => void;
};

const LogoutButton: React.FC<Props> = ({ onClick }) => {
	return (
		<Container onClick={onClick}>
			<FaRegArrowAltCircleLeft />
			<span>로그아웃</span>
		</Container>
	);
};

export default LogoutButton;
