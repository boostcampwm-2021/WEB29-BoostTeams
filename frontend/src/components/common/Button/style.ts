import styled from 'styled-components';
import { Font, ColorCode } from '../../../utils/constants';

interface NormalButtonProps {
	backgroundColor: string;
	fontColor: string;
}

export const NormalButton = styled.button<NormalButtonProps>`
	outline: none;
	background-color: ${(props) => `${props.backgroundColor}`};
	color: ${(props) => `${props.fontColor}`};
	border-color: ${(props) => (props.backgroundColor === ColorCode.WHITE ? ColorCode.LINE2 : `transparent`)};
	border-radius: 8px;
	border-width: 2px;
	border-style: outset;
	font-size: ${Font.SMALL};
	font-weight: 500;
	padding: 0.2rem 1rem;
	cursor: pointer;
	:hover {
		opacity: 0.9;
	}
`;
