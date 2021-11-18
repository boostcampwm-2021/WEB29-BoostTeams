import React from 'react';
import { Wrapper, Container } from './style';

interface Props {
	setModalType: (type: string) => void;
	handleModalOpen: () => void;
}

const CreateButton: React.FC<Props> = ({ setModalType, handleModalOpen }) => {
	const handleClick = () => {
		setModalType('create');
		handleModalOpen();
	};

	return (
		<Wrapper>
			<Container onClick={handleClick}>
				<span>새 포스트잇 생성</span>
			</Container>
		</Wrapper>
	);
};

export default CreateButton;
