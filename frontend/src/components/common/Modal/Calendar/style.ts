import styled from 'styled-components';
import { ColorCode } from '../../../../utils/constants';

export const Container = styled.form`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 30rem;
	height: 22rem;
	background-color: ${ColorCode.WHITE};
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	border-radius: 8px;
	z-index: 25;
	padding: 4rem 3rem 3rem 2rem;
	box-sizing: border-box;

	input {
		border: none;
		&:focus {
			outline: none;
		}
	}
`;

export const FormContainer = styled.div``;
export const TitleContainer = styled.div`
	margin-bottom: 1.2rem;
	input {
		font-size: 1.2rem;
	}
`;
export const TimeContainer = styled.div``;
export const ButtonWrapper = styled.div``;
