import { ColorCode, Font } from '@utils/constants';
import styled, { keyframes } from 'styled-components';

const floatAnimation = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`;

export const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 10%;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.45);
	font-size: ${Font.LARGE};
	gap: 0.5rem;
	animation: ${floatAnimation} 0.2s ease-out 1;
	color: ${ColorCode.WHITE};
	&:hover {
		color: ${ColorCode.ERROR};
		cursor: grab;
		span:before {
			content: '포스트잇 삭제';
		}
	}
`;

export const Text = styled.span`
	&:before {
		content: '이 영역에 포스트잇을 놓을 경우 삭제할 수 있습니다.';
	}
`;
