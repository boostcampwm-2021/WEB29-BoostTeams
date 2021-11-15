import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

export const Container = styled.div`
	display: flex;
	gap: 0.5rem;
	width: calc(100% - 3rem);
	font-size: 0.9rem;
	font-weight: 400;
	padding: 0rem 1.5rem;
	height: 2.5rem;
	align-items: center;
	cursor: pointer;
	&:hover {
		background-color: ${ColorCode.LINE2};
	}
	&:last-of-type {
		border-radius: 0px 0px 8px 8px;
	}
`;
