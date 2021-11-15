import styled from 'styled-components';
import { ColorCode, Font } from '@utils/constants';

export const ProfileImage = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.color || ColorCode.WHITE};
	font-size: ${Font.SMALL};
	border-radius: 50%;
	width: 2.3rem;
	height: 2.3rem;
`;
