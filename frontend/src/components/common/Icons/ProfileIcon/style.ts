import styled from 'styled-components';
import { ColorCode } from '../../../../utils/constants';

interface ProfileIconContainerProps {
	backgroundColor: string;
	fontColor: string;
}

export const Container = styled.div`
	width: 3rem;
	height: 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		background-color: ${ColorCode.HOVER};
	}
`;

export const ProfileIconContainer = styled('div')<ProfileIconContainerProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 2rem;
	width: 2rem;
	border-radius: 50%;
	background-color: ${(props) => props.backgroundColor || ColorCode.WHITE};
	color: ${(props) => props.fontColor || ColorCode.BLACK};
	span {
		font-weight: bold;
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
