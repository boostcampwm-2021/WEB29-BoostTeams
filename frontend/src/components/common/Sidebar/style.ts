import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

export const Container = styled.div`
	flex-shrink: 0;
	position: relative;
	background-color: ${ColorCode.BACKGROUND2};
	width: 17rem;
	height: 100%;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;
