import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

interface BtnContainerProps {
	direction: string;
	gap: string;
}

export const BtnContainer = styled('div')<BtnContainerProps>`
	display: flex;
	flex-direction: ${(props) => props.direction || 'row'};
	width: 100%;
	gap: ${(props) => props.gap || '0'};

	& > * {
		width: 100%;
	}
`;

export const InputContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	& > span {
		width: 7rem;
	}
`;

export const Input = styled.input`
	width: 100%;
	line-height: 1.5rem;
	font-size: 1rem;
	border: none;
	box-shadow: 0px 1px 0px 0px ${ColorCode.LINE3};
	background-color: ${ColorCode.BACKGROUND1};
	padding: 0;
	&::placeholder {
		color: ${ColorCode.PLACEHOLDER};
	}
	&:focus-visible {
		outline: none;
		box-shadow: 0px 2px 0px 0px ${ColorCode.PRIMARY1};
	}
`;

export const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 2.5rem;
	border: 1px solid ${ColorCode.FONT1};
	border-radius: 10px;
	font-size: 1.3rem;
	gap: 0.25rem;
	cursor: pointer;
	span {
		font-size: 1.1rem;
		color: ${ColorCode.FONT_BASE};
	}
	&:hover {
		background-color: ${ColorCode.PRIMARY1};
		span {
			color: ${ColorCode.WHITE};
			font-weight: 500;
		}
		svg {
			filter: invert(100%);
		}
	}
`;
