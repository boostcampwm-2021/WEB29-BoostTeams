import styled from 'styled-components';
import { HEADER } from '@utils/constants';

export const Layout = styled.div`
	position: relative;
	height: 100%;
`;

export const MainContainer = styled.div`
	display: flex;
	cursor: grab;
	height: calc(100% - ${HEADER.HEIGHT}px);
`;
