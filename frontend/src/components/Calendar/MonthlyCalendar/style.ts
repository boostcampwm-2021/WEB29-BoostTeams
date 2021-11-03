import styled from 'styled-components';
import { ColorCode } from '../../../utils/constants';

export const Container = styled.section`
	height: calc(100% - 3rem);
	overflow: hidden;
	border-right: 1px solid ${ColorCode.LINE2};
	border-top: 1px solid ${ColorCode.LINE2};
`;
