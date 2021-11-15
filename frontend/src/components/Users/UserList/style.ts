import { ColorCode } from '@src/utils/constants';
import styled from 'styled-components';

export const UserHeaderContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 5%;
	width: 100%;
`;

export const Teamname = styled.div`
	font-size: 18;
`;

export const HeaderText = styled.div`
	font-size: 2rem;
	font-weight: bold;
`;

export const InputContainer = styled.div`
	width: 20%;
	display: flex;
	align-items: center;
`;

export const IconWrapper = styled.div`
	position: relative;
	left: -1.5rem;
`;

export const SearchInput = styled.input`
	width: 100%;
	padding: 0.5rem;
	border-radius: 8px;
	border: 1px solid ${ColorCode.BACKGROUND2};
`;

export const LabelContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 1rem;
`;

export const UserWrapper = styled.div`
	background-color: ${ColorCode.WHITE};
	display: flex;
	justify-content: space-between;
	padding: 1rem;
`;

export const Container = styled.div`
	& > * {
		margin: 2rem;
	}
`;

export const UserListWrapper = styled.div`
	padding: 0 5% 5% 5%;
	& > * {
		margin: 1rem;
	}
`;
