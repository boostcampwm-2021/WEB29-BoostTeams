import React from 'react';
import { BiMessageAltAdd } from 'react-icons/bi';
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
			<BiMessageAltAdd />
			<Wrapper onClick={handleClick}>
				<span>새 포스트잇 생성</span>
			</Wrapper>
		</Container>
	);
};

export default CreateButton;
