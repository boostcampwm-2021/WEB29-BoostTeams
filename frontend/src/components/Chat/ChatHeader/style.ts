import { ColorCode } from '@utils/constants';
import styled from 'styled-components';

export const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 3.5rem;
	border-bottom: solid 1px ${ColorCode.LINE2};
	z-index: 15;
`;
