import styled from 'styled-components';
import { ColorCode } from '../../../utils/constants';

export const Wrapper = styled.div`
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
		&:visited {
			color: ${ColorCode.WHITE};
		}
	}
`;
