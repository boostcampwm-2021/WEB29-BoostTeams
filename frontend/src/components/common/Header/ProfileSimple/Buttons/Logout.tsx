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
			<span>๋ก๊ทธ์์</span>
		</Container>
	);
};

export default LogoutButton;
