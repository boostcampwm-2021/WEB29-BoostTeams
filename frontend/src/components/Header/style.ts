import styled from 'styled-components';
import { ColorCode } from '../../utils/constants';

export const Container = styled.header`
	height: 3rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${ColorCode.PRIMARY1};
	padding: 0 1rem;
`;

export const LogoWrapper = styled.div`
	a {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: ${ColorCode.WHITE};
		font-weight: bold;
		font-size: 1.5rem;
		img {
			padding-right: 0.5rem;
			width: 2rem;
		}
	}
`;
