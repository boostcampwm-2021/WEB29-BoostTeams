import styled from 'styled-components';
import { Font } from '@utils/constants';

interface ContainerProps {
	len: number;
	start: number;
	color: string;
	borderColor: string;
}

export const Container = styled.div<ContainerProps>`
	position: absolute;
	top: ${(props) => `${(props.start * 2.5).toString()}rem`};
	left: 0;
	right: 0;
	height: ${(props) => `${(props.len * 2.5).toString()}rem`};
	border-left: solid 4px;
	border-color: ${(props) => `${props.borderColor}`};
	border-radius: 4px;
	background-color: ${(props) => `${props.color}`};
	cursor: pointer;
	span {
		display: block;
		padding: 0.5rem;
		font-size: ${Font.SMALL};
	}
`;
