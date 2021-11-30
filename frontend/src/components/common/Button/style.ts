import styled from 'styled-components';
import { Font } from '@utils/constants';

interface NormalButtonProps {
	backgroundColor: string;
	fontColor: string;
}

export const NormalButton = styled.button<NormalButtonProps>`
	outline: none;
	background-color: ${(props) => `${props.backgroundColor}`};
	color: ${(props) => `${props.fontColor}`};
	border-radius: 10px;
	border: none;
	font-size: ${Font.SMALL};
	font-weight: 600;
	width: 4rem;
	padding: 0.25rem 1rem;
	cursor: pointer;
	&:hover {
		filter: brightness(95%);
	}
`;
