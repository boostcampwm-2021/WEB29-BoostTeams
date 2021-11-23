import { ColorCode, Font } from '@utils/constants';
import styled from 'styled-components';

export const Container = styled.div`
	min-height: 100%;
	background-color: ${ColorCode.WHITE};
	padding: 0 0.6rem;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	border-bottom: solid 2px transparent;
	:focus-within {
		border-style: outset;
		border-bottom: solid 2px ${ColorCode.PRIMARY1};
	}
`;

export const UserListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	div {
		display: flex;
		padding: 0.5rem;
		margin: 0.5rem 0.3rem;
		background-color: ${ColorCode.BACKGROUND1};
		border-radius: 10px;
		span {
			font-size: ${Font.SMALL};
		}
		svg {
			width: 0.6rem;
			margin-left: 0.4rem;
			color: ${ColorCode.LINE3};
			cursor: pointer;
		}
	}
`;

export const InputWrapper = styled.div`
	flex-grow: 1;
	input {
		width: 100%;
		height: 3rem;
		padding-left: 0.5rem;
		border: none;
		outline: none;
	}
`;

export const SearchContainer = styled.div`
	position: absolute;
	top: 100%;
	left: 3rem;
	right: 3rem;
	background-color: ${ColorCode.WHITE};
	border-radius: 0 0 8px 8px;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const UserContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 0 0.8rem;
	height: 3rem;
	cursor: pointer;
	border-radius: 8px;
	span {
		color: ${ColorCode.FONT1};
		font-size: ${Font.SMALL};
	}
	:hover {
		background-color: ${ColorCode.LINE1};
	}
`;
