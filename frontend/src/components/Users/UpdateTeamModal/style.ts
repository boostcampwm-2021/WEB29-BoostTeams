import { ColorCode } from '@src/utils/constants';
import styled from 'styled-components';

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 10%;
	& > * {
		margin: 5%;
	}
`;

export const Input = styled.input`
	font-size: 1rem;
`;
