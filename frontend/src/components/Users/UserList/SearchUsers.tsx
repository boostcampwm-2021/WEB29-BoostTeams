import React from 'react';
import DropDown from '@src/components/common/DropDown';
import { FaSearch, FaCog } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { SearchInput, IconWrapper, InputContainer, SearchUsersContainer, ButtonContainer } from './style';

interface Props {
	handleInput: (e: any) => void;
	openModal: (mode: string) => void;
	isAdmin: boolean;
}

const SearchUsers: React.FC<Props> = ({ handleInput, openModal, isAdmin }) => {
	const onSelect = (value: number) => {
		switch (value) {
			case 0:
				openModal('EXIT');
				break;
			case 1:
				openModal('DELETE');
				break;
			case 2:
				openModal('UPDATE');
				break;
			default:
				toast('올바르지 않은 접근입니다');
		}
	};
	return (
		<SearchUsersContainer>
			<h2>구성원</h2>
			<InputContainer>
				<SearchInput type='text' placeholder='구성원 검색' onChange={handleInput} />
				<IconWrapper>
					<FaSearch />
				</IconWrapper>
				<ButtonContainer>
					<DropDown
						options={isAdmin ? ['팀 나가기', '팀 삭제하기', '팀 정보수정'] : ['팀 나가기']}
						selectedOption={<FaCog size='20' />}
						setSelectedOption={onSelect}
					/>
				</ButtonContainer>
			</InputContainer>
		</SearchUsersContainer>
	);
};

export default SearchUsers;
