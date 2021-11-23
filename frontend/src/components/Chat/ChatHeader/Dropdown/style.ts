import { ColorCode, Font } from '@utils/constants';
import styled from 'styled-components';

export const UsersDropdownContainer = styled.div`
	position: absolute;
	top: calc(100% + 0.2rem);
	right: 1rem;
	height: fit-content;
	background-color: ${ColorCode.WHITE};
	border-radius: 8px;
	font-size: ${Font.SMALL};
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
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

export const InviteDropdownContainer = styled.div`
	position: absolute;
	top: calc(100% + 0.2rem);
	right: 1rem;
	width: 20rem;
	height: fit-content;
	background-color: ${ColorCode.WHITE};
	border-radius: 8px;
	font-size: ${Font.SMALL};
	padding: 1.8rem 1rem 1rem 1rem;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	h3 {
		font-weight: bold;
		padding-left: 0.5rem;
		margin-bottom: 0.5rem;
	}
`;

export const SearchInputWrapper = styled.div`
	position: relative;
`;

export const ButttonContainer = styled.div`
	display: flex;
	justify-content: right;
	margin-top: 1rem;
	button {
		margin-left: 0.5rem;
	}
`;

export const UpdateDropdownContainer = styled.div`
	position: absolute;
	top: calc(100% + 0.2rem);
	left: 1rem;
	width: 20rem;
	height: fit-content;
	background-color: ${ColorCode.WHITE};
	border-radius: 8px;
	font-size: ${Font.SMALL};
	padding: 1.8rem 1rem 1rem 1rem;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	h3 {
		font-weight: bold;
		padding-left: 0.5rem;
		margin-bottom: 1.2rem;
	}
	input {
		background-color: ${ColorCode.BACKGROUND1};
		padding: 0.5rem;
		border-radius: 8px;
		width: 100%;
		box-sizing: border-box;
		border: none;
		outline: none;
	}
`;
