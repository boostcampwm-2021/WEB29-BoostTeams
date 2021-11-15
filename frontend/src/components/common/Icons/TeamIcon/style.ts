import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

export const ProfileImage = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.color || ColorCode.WHITE};
	border-radius: 20%;
	width: 4rem;
	height: 4rem;
`;
