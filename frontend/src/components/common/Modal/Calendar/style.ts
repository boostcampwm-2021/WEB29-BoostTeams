import styled from 'styled-components';
import { ColorCode, Font } from '../../../../utils/constants';

export const Container = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 30rem;
	background-color: ${ColorCode.WHITE};
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	border-radius: 8px;
	z-index: 25;
	padding: 4rem 2rem 2rem 2rem;
	box-sizing: border-box;
	input {
		border: none;
		&:focus {
			outline: none;
		}
	}
`;

export const FormContainer = styled.form`
	textarea {
		margin: 1.5rem 0 1rem 0;
		border: none;
		width: 100%;
		font-size: ${Font.SMALL};
		font-family: inherit;
		resize: none;
		padding: 0;
		:focus {
			outline: none;
		}
	}
`;

export const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1.5rem;
	input {
		margin-left: 0.5rem;
		font-size: 1.2rem;
	}
`;
export const TimeContainer = styled.div`
	width: 24rem;
	display: flex;
	justify-content: space-between;
	margin-bottom: 1.5rem;
	input {
		font-family: inherit;
		font-size: ${Font.SMALL};
		cursor: pointer;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: right;
	button {
		margin-left: 1rem;
	}
`;

export const DeleteButtonWrapper = styled.button`
	position: absolute;
	top: 1.5rem;
	right: 1.5rem;
	border: transparent;
	background-color: transparent;
	padding: 0;
	svg {
		color: ${ColorCode.LINE3};
		cursor: pointer;
		width: 1.2rem;
		height: 1.2rem;
	}
`;
