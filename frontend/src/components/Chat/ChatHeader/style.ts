import { ColorCode, Font } from '@src/utils/constants';
import styled from 'styled-components';

export const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 3.5rem;
	border-bottom: solid 1px ${ColorCode.LINE2};
	z-index: 15;
`;

export const HeaderContainer = styled.div`
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1rem;
	position: relative;
`;

export const ButtonContainer = styled.div`
	display: flex;
`;

export const UserDropDownBtn = styled.button`
	width: 2.5rem;
	height: 2.5rem;
	cursor: pointer;
	border: none;
	background-color: transparent;
	color: ${ColorCode.FONT1};
	flex-shrink: 0;
	display: flex;
	align-items: center;
	position: relative;
	svg {
		width: 1.2rem;
		height: 1.2rem;
	}
	span {
		position: absolute;
		right: 0.5rem;
		bottom: 0.4rem;
	}
	:hover {
		color: ${ColorCode.PRIMARY1};
	}
`;

export const DropDownContainer = styled.div`
	position: absolute;
	top: calc(100% + 0.2rem);
	right: 1rem;
	height: fit-content;
	background-color: ${ColorCode.WHITE};
	border-radius: 8px;
	font-size: ${Font.SMALL};
`;

export const ProfileContainer = styled.div`
	display: flex;
	align-items: center;
	height: 3rem;
	padding: 0 1.2rem 0 0.5rem;
	:hover {
		border-radius: 8px;
		background-color: ${ColorCode.LINE1};
	}
`;

export const InvititationBtn = styled.div`
	padding: 0 1.2rem;
	height: 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border-top: solid 1px ${ColorCode.LINE1};
	svg {
		width: 1.1rem;
		height: 1.1rem;
		padding-right: 0.4rem;
		color: ${ColorCode.FONT1};
	}
	:hover {
		border-radius: 8px;
		background-color: ${ColorCode.LINE1};
	}
`;

export const ExitBtn = styled.button`
	width: 2.5rem;
	height: 2.5rem;
	cursor: pointer;
	border: none;
	background-color: transparent;
	color: ${ColorCode.FONT1};
	flex-shrink: 0;
	display: flex;
	align-items: center;
	svg {
		width: 1.4rem;
		height: 1.4rem;
	}
	:hover {
		color: ${ColorCode.PRIMARY1};
	}
`;

export const ChatRoomInfoContainer = styled.div`
	display: flex;
	align-items: center;
	flex-shrink: 0;
	h2 {
		margin: 0 0.6rem;
		font-weight: bold;
	}
	svg {
		color: ${ColorCode.FONT1};
		cursor: pointer;
		:hover {
			color: ${ColorCode.PRIMARY1};
		}
	}
`;

export const SearchHeaderContainer = styled.div`
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
	top: 3.5rem;
	left: 3rem;
	right: 3rem;
	background-color: ${ColorCode.WHITE};
	border-radius: 0 0 8px 8px;
`;

export const UserContainer = styled.div`
	display: flex;
	align-items: center;
	padding-left: 0.8rem;
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
