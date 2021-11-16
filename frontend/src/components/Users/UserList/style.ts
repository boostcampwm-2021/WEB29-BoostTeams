import { ColorCode } from '@src/utils/constants';
import styled from 'styled-components';

export const HeaderText = styled.div`
	font-size: 1.5rem;
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
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
`;

export const LabelContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 1rem;
`;

export const UserWrapper = styled.div`
	background-color: ${ColorCode.WHITE};
	display: flex;
	justify-content: space-between;
	padding: 1rem;
	border-radius: 8px;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
`;

export const Container = styled.div`
	& > * {
		margin: 1.5rem 0;
	}
`;

export const Layout = styled.div`
	padding: 0 3% 3% 3%;
`;
