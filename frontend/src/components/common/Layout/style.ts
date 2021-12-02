import styled from 'styled-components';
import { HEADER } from '@src/utils/constants';

export const MainContainer = styled.div`
	display: flex;
	width: 100%;
	height: calc(100% - ${HEADER.HEIGHT}px);
`;
