import styled from 'styled-components';
import { ColorCode, Font } from '@utils/constants';

export const InputContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	* {
		flex-shrink: 0;
	}
`;

export const IconWrapper = styled.div`
	position: relative;
	left: -1.5rem;
`;

export const SearchInput = styled.input`
	width: 12rem;
	padding: 0.5rem;
	border-radius: 8px;
	border: 1px solid ${ColorCode.BACKGROUND2};
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
	outline: none;
`;

export const UserWrapper = styled.div`
	background-color: ${ColorCode.WHITE};
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem 0.7rem 0.5rem 0.5rem;
	border-radius: 8px;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
	margin: 1rem 0;
	font-size: ${Font.SMALL};
	div {
		display: flex;
		align-items: center;
	}
`;

export const SearchUsersContainer = styled.div`
	margin-top: 2rem;
	h2 {
		font-size: ${Font.LARGE};
		font-weight: bold;
		margin-bottom: 1.5rem;
	}
`;

export const UserListContainer = styled.div`
	margin-top: 2rem;
	h3 {
		display: flex;
		font-weight: bold;
		font-size: 1.2rem;
		padding: 1rem 0;
		svg {
			margin-left: 0.5rem;
			cursor: pointer;
		}
	}
`;

export const LabelContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 0.2rem;
`;

export const Layout = styled.div``;

export const ButtonContainer = styled.div`
	width: 22rem;
	display: flex;
	justify-content: space-between;
`;
