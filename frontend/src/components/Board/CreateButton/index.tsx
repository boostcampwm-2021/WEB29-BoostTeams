import React from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';
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
		<Container>
			<FaRegPlusSquare />
			<Wrapper onClick={handleClick}>
				<span>새 포스트잇 생성</span>
			</Wrapper>
		</Container>
	);
};

export default CreateButton;
