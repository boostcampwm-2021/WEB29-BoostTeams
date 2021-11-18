import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

interface ContainerProps {
	width: string;
	isHover?: boolean;
}

interface ProfileIconContainerProps extends ContainerProps {
	backgroundColor: string;
	fontColor: string;
}

export const Container = styled('div')<ContainerProps>`
	height: ${(props) => props.width};
	width: ${(props) => props.width};
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		background-color: ${(props) => (props.isHover ? ColorCode.HOVER : 'none')};
	}
	cursor: pointer;
`;

export const ProfileIconContainer = styled('div')<ProfileIconContainerProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: ${(props) => props.width};
	width: ${(props) => props.width};
	border: 1px solid ${ColorCode.PRIMARY1};
	border-radius: 50%;
	background-color: ${(props) => props.backgroundColor || ColorCode.WHITE};
	color: ${(props) => props.fontColor || ColorCode.BLACK};
	span {
		font-weight: bold;
		font-size: calc(${(props) => props.width} / 2);
		vertical-align: middle;
	}
`;

export const Status = styled.div`
	position: absolute;
	right: 0;
	bottom: 0;
	background-color: ${(props) => props.color || ColorCode.GRAY};
	height: 0.5rem;
	width: 0.5rem;
	border-radius: 50%;
`;
