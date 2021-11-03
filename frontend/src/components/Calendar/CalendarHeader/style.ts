import styled from 'styled-components';
import { ColorCode } from '../../../utils/constants';

export const Container = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 2.5rem;
	background-color: ${ColorCode.BACKGROUND1};
	padding: 0 0.8rem;
	box-sizing: border-box;
	border-bottom: solid 1px ${ColorCode.LINE2};
	svg {
		color: ${ColorCode.FONT2};
	}
`;

export const InfoContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 13rem;
	font-size: 0.9rem;
	svg {
		&:hover {
			color: ${ColorCode.HOVER};
		}
	}
`;

export const ButtonContainer = styled.div`
	& > * {
		margin: 0 0.5rem;
	}
`;

export const TodayBtn = styled.button`
	border: none;
	background-color: transparent;
	span {
		padding-left: 0.5rem;
		font-size: 0.9rem;
	}
	& > *:hover {
		color: ${ColorCode.HOVER};
	}
`;

export const NewAppointmentBtn = styled.button`
	background-color: ${ColorCode.BUTTON1};
	color: ${ColorCode.WHITE};
	border-radius: 8px;
	padding: 0.3rem 0.5rem;
	&:hover {
		background-color: ${ColorCode.PRIMARY1};
	}
`;

export const ConvertCalenderBtn = styled.button`
	background-color: transparent;
	border: 1px solid ${ColorCode.LINE2};
	border-radius: 8px;
	padding: 0.3rem 0.5rem;
	&:hover {
		color: ${ColorCode.PRIMARY1};
		border: 1px solid ${ColorCode.PRIMARY1};
	}
`;
