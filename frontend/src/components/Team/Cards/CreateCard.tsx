import React from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { Container, Name, ThumbnailWrapper } from './style';

interface Props {
	onClick: () => void;
}

const CreateCard: React.FC<Props> = ({ onClick }) => {
	return (
		<Container onClick={onClick}>
			<ThumbnailWrapper team_id={0}>
				<BsPlusCircleDotted />
			</ThumbnailWrapper>
			<Name>새로운 팀 생성</Name>
		</Container>
	);
};

export default CreateCard;
