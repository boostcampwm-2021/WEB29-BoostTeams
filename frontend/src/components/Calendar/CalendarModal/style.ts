import styled from 'styled-components';
import { ColorCode, Font } from '@utils/constants';

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
	span {
		font-weight: bold;
		font-size: ${Font.SMALL};
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
	width: 20rem;
	display: flex;
	justify-content: space-between;
	margin-bottom: 1.5rem;
	input {
		width: 5rem;
		font-family: inherit;
		font-size: ${Font.SMALL};
		cursor: pointer;
	}
`;

export const ButtonContainer = styled.div`
	position: absolute;
	top: 1.5rem;
	right: 1.5rem;
	border: transparent;
	background-color: transparent;
	padding: 0;
	svg {
		margin-left: 1rem;
		color: ${ColorCode.LINE3};
		cursor: pointer;
		width: 1.2rem;
		height: 1.2rem;
	}
`;
