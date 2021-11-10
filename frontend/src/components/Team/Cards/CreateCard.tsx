import React from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { Container, ImageWrapper, Name } from './style';

interface Props {
	onClick: () => void;
}

const CreateCard: React.FC<Props> = ({ onClick }) => {
	return (
		<Container onClick={onClick}>
			<ImageWrapper>
				<BsPlusCircleDotted />
			</ImageWrapper>
			<Name>새로운 팀 생성</Name>
		</Container>
	);
};

export default CreateCard;
