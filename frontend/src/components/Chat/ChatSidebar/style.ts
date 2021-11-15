import { ColorCode, Font } from '@src/utils/constants';
import styled from 'styled-components';

interface ChatRoomProps {
	focus: boolean;
}

export const SidebarHeader = styled.div`
	display: flex;
	height: 3rem;
	align-items: center;
	justify-content: space-between;
	padding: 0 1rem;
	border-bottom: solid 1px ${ColorCode.LINE2};
	h2 {
		font-weight: bold;
	}
	svg {
		width: 1.5rem;
		height: 1.5rem;
		color: ${ColorCode.FONT1};
		cursor: pointer;
	}
`;

export const ChatRoomsContainer = styled.div`
	width: 100%;
	position: absolute;
	top: 3rem;
	bottom: 0;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;

export const ChatRoom = styled.div<ChatRoomProps>`
	display: flex;
	align-items: center;
	padding: 0 1rem;
	box-sizing: border-box;
	cursor: pointer;
	width: 100%;
	height: 4.5rem;
	border-radius: 8px;
	background-color: ${(props) => (props.focus ? `${ColorCode.WHITE}` : 'transparent')};
	:hover {
		background-color: ${ColorCode.WHITE};
	}
`;

export const ChatRoomInfoContainer = styled.div`
	width: calc(100% - 2.3rem);
	padding-left: 0.5rem;
	font-size: ${Font.X_SMALL};
	flex-grow: 1;
	overflow: hidden;
	white-space: nowrap;
`;

export const ChatRoomInfo = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.5rem;
	h3 {
		font-size: ${Font.SMALL};
	}
`;
