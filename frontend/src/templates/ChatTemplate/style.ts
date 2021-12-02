import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

export const Layout = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	height: 100%;
`;

export const ChatContainer = styled.div`
	position: relative;
	min-width: 35rem;
	flex-grow: 1;
	background-color: ${ColorCode.BACKGROUND1};
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;
