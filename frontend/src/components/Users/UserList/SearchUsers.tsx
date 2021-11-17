import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { HeaderText, SearchInput, IconWrapper, InputContainer, Container, ExitBtn } from './style';

interface Props {
	handleInput: (e: any) => void;
	handleModalOpen: () => void;
}

const SearchUsers: React.FC<Props> = ({ handleInput, handleModalOpen }) => {
	return (
		<Container>
			<HeaderText>구성원</HeaderText>
			<InputContainer>
				<SearchInput type='text' placeholder='구성원 검색' onChange={handleInput} />
				<IconWrapper>
					<FaSearch />
				</IconWrapper>
				<ExitBtn type='button' onClick={handleModalOpen}>
					팀 나가기
				</ExitBtn>
			</InputContainer>
		</Container>
	);
};

export default SearchUsers;
