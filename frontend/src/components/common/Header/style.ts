import styled from 'styled-components';
import { ColorCode, HEADER } from '@utils/constants';

export const Container = styled.header`
	height: ${HEADER.HEIGHT}px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${ColorCode.PRIMARY1};
	padding: 0 1rem;
`;
