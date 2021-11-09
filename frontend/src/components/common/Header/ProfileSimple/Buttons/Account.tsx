import React from 'react';
import { GrUserSettings } from 'react-icons/gr';
import { Container } from './style';

type Props = {
	onClick: () => void;
};

const AccountButton: React.FC<Props> = ({ onClick }) => {
	return (
		<Container onClick={onClick}>
			<GrUserSettings />
			<span>계정 관리</span>
		</Container>
	);
};

export default AccountButton;
