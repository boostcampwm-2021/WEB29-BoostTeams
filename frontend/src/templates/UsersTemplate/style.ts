import { ColorCode } from '@src/utils/constants';
import styled from 'styled-components';

export const MainContainer = styled.div`
	position: absolute;
	top: 3rem;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
`;

export const ContentContainer = styled.div`
	width: 100%;
	padding: 2rem;
	background-color: ${ColorCode.BACKGROUND2};
	overflow-y: scroll;
	min-width: 40rem;
`;
