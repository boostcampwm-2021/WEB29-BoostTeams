import styled from 'styled-components';
import { ColorCode } from '../../../../utils/constants';

interface ContainerProps {
	len: number;
	start: number;
}

export const Container = styled.div<ContainerProps>`
	position: absolute;
	top: ${(props) => `${(props.start * 2.5).toString()}rem`};
	left: 0;
	right: 0;
	height: ${(props) => `${(props.len * 2.5).toString()}rem`};
	border-left: solid 4px;
	border-color: ${ColorCode.PRIMARY1};
	border-radius: 4px;
	background-color: #e2e2f6;
	cursor: pointer;
	span {
		display: block;
		padding: 0.5rem;
		font-size: 0.9rem;
	}
`;
