import Button from '@src/components/common/Button';
import { ColorCode } from '@src/utils/constants';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { HeaderText, SearchInput, IconWrapper, InputContainer, Container, ButtonContainer } from './style';

interface Props {
	handleInput: (e: any) => void;
	handleExitModalOpen: () => void;
	handleUpdateModalOpen: () => void;
	handleDeleteModalOpen: () => void;
	isAdmin: boolean;
}

const SearchUsers: React.FC<Props> = ({
	handleInput,
	handleExitModalOpen,
	handleUpdateModalOpen,
	handleDeleteModalOpen,
	isAdmin,
}) => {
	return (
		<Container>
			<HeaderText>구성원</HeaderText>
			<InputContainer>
				<SearchInput type='text' placeholder='구성원 검색' onChange={handleInput} />
				<IconWrapper>
					<FaSearch />
				</IconWrapper>
				<ButtonContainer>
					<Button
						text='팀 나가기'
						handler={handleExitModalOpen}
						backgroundColor={ColorCode.PRIMARY1}
						fontColor={ColorCode.WHITE}
					/>
					{isAdmin && (
						<>
							<Button
								text='팀 삭제'
								handler={handleDeleteModalOpen}
								backgroundColor={ColorCode.PRIMARY1}
								fontColor={ColorCode.WHITE}
							/>
							<Button
								text='팀 정보 수정하기'
								handler={handleUpdateModalOpen}
								backgroundColor={ColorCode.PRIMARY1}
								fontColor={ColorCode.WHITE}
							/>
						</>
					)}
				</ButtonContainer>
			</InputContainer>
		</Container>
	);
};

export default SearchUsers;
