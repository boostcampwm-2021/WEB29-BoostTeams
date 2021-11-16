import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { HeaderText, SearchInput, IconWrapper, InputContainer, Container } from './style';

interface Props {
	handleInput: (e: any) => void;
}

const SearchUsers: React.FC<Props> = ({ handleInput }) => {
	return (
		<Container>
			<HeaderText>구성원</HeaderText>
			<InputContainer>
				<SearchInput type='text' placeholder='구성원 검색' onChange={handleInput} />
				<IconWrapper>
					<FaSearch />
				</IconWrapper>
			</InputContainer>
		</Container>
	);
};

export default SearchUsers;
