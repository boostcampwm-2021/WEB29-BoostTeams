import styled from 'styled-components';
import { ColorCode } from '@utils/constants';

export const Container = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 2.5rem;
	background-color: ${ColorCode.BACKGROUND1};
	padding: 0 1rem;
	box-sizing: border-box;
	border-bottom: solid 1px ${ColorCode.LINE2};
	svg {
		color: ${ColorCode.FONT2};
	}
`;

export const InfoContainer = styled.div`
	flex-shrink: 0;
	display: flex;
	align-items: center;
	font-size: 0.9rem;
	div {
		padding: 0 0.8rem;
	}
	svg {
		cursor: pointer;
		&:hover {
			color: ${ColorCode.HOVER};
		}
	}
`;

export const ButtonContainer = styled.div`
	flex-shrink: 0;
	display: flex;
	align-items: center;
	gap: 1rem;
`;

export const TodayBtn = styled.button`
	border: none;
	background-color: transparent;
	cursor: pointer;
	span {
		padding-left: 0.3rem;
		font-size: 0.9rem;
	}
	&:hover {
		span,
		svg {
			color: ${ColorCode.HOVER};
		}
	}
`;

export const NewAppointmentBtn = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.3rem;
	width: 5.5rem;
	height: 1.8rem;
	background-color: ${ColorCode.HOVER};
	color: ${ColorCode.WHITE};
	font-size: 0.9rem;
	border-radius: 8px;
	border: none;
	cursor: pointer;
	svg {
		color: ${ColorCode.WHITE};
	}
	&:hover {
		background-color: ${ColorCode.PRIMARY1};
	}
	transition: all 0.2s ease-in-out;
`;

interface btnProps {
	focus: boolean;
}

export const ConvertBtnContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 3.8rem;
	height: 1.8rem;
	border-radius: 4rem;
	padding: 0 0.3rem;
	border: 1px solid ${ColorCode.LINE2};
	background-color: ${ColorCode.HOVER};
	cursor: pointer;
	&:hover {
		background-color: ${ColorCode.PRIMARY1};
	}
	transition: all 0.2s ease-in-out;
`;

export const ConvertBtn = styled.button<btnProps>`
	background-color: ${(props) => (props.focus ? `${ColorCode.LINE1}` : 'transparent')};
	color: ${ColorCode.WHITE};
	font-size: ${(props) => (props.focus ? 0 : '0.9rem')};
	border-radius: 100%;
	border: none;
	padding: 0;
	cursor: pointer;
	width: ${(props) => (props.focus ? '1.3rem' : '2.3rem')};
	height: ${(props) => (props.focus ? '1.3rem' : '1.8rem')};
`;
