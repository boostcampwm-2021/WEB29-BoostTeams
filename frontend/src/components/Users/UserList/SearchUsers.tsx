import Button from '@src/components/common/Button';
import { ColorCode } from '@src/utils/constants';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { SearchInput, IconWrapper, InputContainer, SearchUsersContainer, ButtonContainer } from './style';

interface Props {
	handleInput: (e: any) => void;
	onBtnClick: (mode: string) => void;
	isAdmin: boolean;
}

const SearchUsers: React.FC<Props> = ({ handleInput, onBtnClick, isAdmin }) => {
	return (
		<SearchUsersContainer>
			<h2>구성원</h2>
			<InputContainer>
				<SearchInput type='text' placeholder='구성원 검색' onChange={handleInput} />
				<IconWrapper>
					<FaSearch />
				</IconWrapper>
				<ButtonContainer>
					<Button
						text='팀 나가기'
						handler={() => onBtnClick('EXIT')}
						backgroundColor={ColorCode.PRIMARY1}
						fontColor={ColorCode.WHITE}
					/>
					{isAdmin && (
						<>
							<Button
								text='팀 삭제'
								handler={() => onBtnClick('DELETE')}
								backgroundColor={ColorCode.PRIMARY1}
								fontColor={ColorCode.WHITE}
							/>
							<Button
								text='팀 정보 수정하기'
								handler={() => onBtnClick('UPDATE')}
								backgroundColor={ColorCode.PRIMARY1}
								fontColor={ColorCode.WHITE}
							/>
						</>
					)}
				</ButtonContainer>
			</InputContainer>
		</SearchUsersContainer>
	);
};

export default SearchUsers;
