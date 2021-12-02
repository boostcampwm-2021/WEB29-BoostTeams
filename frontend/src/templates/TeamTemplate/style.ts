import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

export const Layout = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 5rem;
	height: 100%;
	background-color: ${ColorCode.BACKGROUND1};
`;
