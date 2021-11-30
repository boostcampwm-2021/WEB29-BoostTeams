import React from 'react';
import { FaCog } from 'react-icons/fa';
import { Container } from './style';

type Props = {
	onClick: () => void;
};

const AccountButton: React.FC<Props> = ({ onClick }) => {
	return (
		<Container onClick={onClick}>
			<FaCog />
			<span>계정 관리</span>
		</Container>
	);
};

export default AccountButton;
