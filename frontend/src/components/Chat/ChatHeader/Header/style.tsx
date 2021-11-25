import { ColorCode } from '@utils/constants';
import styled from 'styled-components';

export const RoomHeaderContainer = styled.div`
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1rem;
	position: relative;
`;

export const ButtonContainer = styled.div`
	display: flex;
`;

export const UsersDropdownBtn = styled.button`
	width: 2.5rem;
	height: 2.5rem;
	cursor: pointer;
	border: none;
	background-color: transparent;
	color: ${ColorCode.FONT1};
	flex-shrink: 0;
	display: flex;
	align-items: center;
	position: relative;
	svg {
		width: 1.2rem;
		height: 1.2rem;
	}
	span {
		position: absolute;
		right: 0.5rem;
		bottom: 0.4rem;
	}
	:hover {
		color: ${ColorCode.PRIMARY1};
	}
`;

export const ExitBtn = styled.button`
	width: 2.5rem;
	height: 2.5rem;
	cursor: pointer;
	border: none;
	background-color: transparent;
	color: ${ColorCode.FONT1};
	flex-shrink: 0;
	display: flex;
	align-items: center;
	svg {
		width: 1.4rem;
		height: 1.4rem;
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
