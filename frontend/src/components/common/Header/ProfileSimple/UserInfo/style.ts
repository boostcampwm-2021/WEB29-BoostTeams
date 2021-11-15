import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	padding: 0 1rem;
	gap: 0.25rem;
	margin-bottom: 1rem;
`;

export const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding: 0.5rem 0;
	font-size: 1rem;
	font-weight: 500;
`;

export const LinkContainer = styled.a`
	display: flex;
	align-items: center;
	gap: 0.2rem;
	border: 1px solid ${ColorCode.BLACK};
	border-radius: 4px;
	padding: 0.1rem 0.3rem;
	span {
		font-size: 0.7rem;
	}
`;

export const NameContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;
