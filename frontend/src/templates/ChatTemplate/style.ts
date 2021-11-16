import { ColorCode } from '@src/utils/constants';
import styled from 'styled-components';

export const Layout = styled.div`
	position: relative;
	height: 100%;
`;

export const MainContainer = styled.div`
	position: absolute;
	top: 3rem;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	background-color: ${ColorCode.BACKGROUND1};
`;

export const ChatContainer = styled.div`
	position: relative;
	min-width: 35rem;
	flex-grow: 1;
	background-color: ${ColorCode.BACKGROUND1};
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;
