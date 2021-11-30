import { ColorCode } from '@utils/constants';
import styled from 'styled-components';

export const Container = styled.div`
	position: absolute;
	top: 3.5rem;
	bottom: 0;
	left: 0;
	right: 0;
`;

export const MessagesContainer = styled.div`
	position: absolute;
	top: 0;
	bottom: 4.6rem;
	left: 0;
	right: 0;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;

export const NoticeContainer = styled.div`
	position: absolute;
	top: 0;
	bottom: 4.6rem;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	span {
		color: ${ColorCode.FONT1};
		font-weight: bold;
		display: block;
		margin-bottom: 1rem;
	}
`;

export const InputContainer = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	border-top: solid 1px ${ColorCode.LINE1};
	padding: 0.8rem 0;
	display: flex;
	align-items: center;
	justify-content: center;
	input {
		width: 80%;
		height: 3rem;
		border-radius: 5px;
		box-sizing: border-box;
		border: solid 2px transparent;
		padding-left: 0.8rem;
		:focus {
			outline: none;
			border-style: outset;
			border-bottom: solid 2px ${ColorCode.PRIMARY1};
		}
	}
	svg {
		width: 1.5rem;
		height: 1.5rem;
		color: ${ColorCode.FONT1};
		margin-left: 0.5rem;
		cursor: pointer;
		:hover {
			color: ${ColorCode.PRIMARY1};
		}
	}
`;
