import { ColorCode } from '@src/utils/constants';
import styled from 'styled-components';

export const Container = styled.div`
	height: 3.5rem;
	border-bottom: solid 1px ${ColorCode.LINE2};
`;

export const HeaderContainer = styled.div`
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1rem;
`;

export const InvitationBtn = styled.button`
	width: 2.5rem;
	height: 2.5rem;
	cursor: pointer;
	border-radius: 50%;
	border: none;
	background-color: transparent;
	color: ${ColorCode.FONT1};
	flex-shrink: 0;
	svg {
		width: 1.2rem;
		height: 1.2rem;
	}
	:hover {
		color: ${ColorCode.PRIMARY1};
	}
`;

export const ChatRoomInfoContainer = styled.div`
	display: flex;
	align-items: center;
	flex-shrink: 0;
	h2 {
		margin: 0 0.6rem;
		font-weight: bold;
	}
	svg {
		color: ${ColorCode.FONT1};
		cursor: pointer;
		:hover {
			color: ${ColorCode.PRIMARY1};
		}
	}
`;

export const InputHeaderContainer = styled.div``;
