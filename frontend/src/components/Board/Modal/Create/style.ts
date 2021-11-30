import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

export const Input = styled.input`
	font-size: 1rem;
	font-family: Noto Sans KR;
	font-weight: bold;
	border: none;
	border-bottom: 1px solid ${ColorCode.GRAY};
`;

export const Textarea = styled.textarea`
	font-size: 1rem;
	font-family: Noto Sans KR;
	resize: none;
	min-height: 12rem;
	max-height: 12rem;
	min-width: 100%;
	max-width: 100%;
	border: none;
	&:focus-visible {
		outline: none;
	}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
	height: 16rem;
`;

export const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;
