import React from 'react';
import { FaChevronLeft, FaChevronRight, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import { Container, InfoContainer, TodayBtn, NewAppointmentBtn, ConvertCalenderBtn, ButtonContainer } from './style';

interface CalendarHeaderProps {
	changeCalendar: () => void;
	monthly: boolean;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ changeCalendar, monthly }: CalendarHeaderProps) => {
	const openModal = () => {
		console.log('모임 생성 모달 오픈');
	};

	return (
		<Container>
			<InfoContainer>
				<TodayBtn>
					<FaCalendarAlt />
					<span>오늘</span>
				</TodayBtn>
				<FaChevronLeft />
				<span>2021년 11월</span>
				<FaChevronRight />
			</InfoContainer>
			<ButtonContainer>
				<ConvertCalenderBtn onClick={changeCalendar}>{monthly ? '주간' : '월간'}</ConvertCalenderBtn>
				<NewAppointmentBtn onClick={openModal}>
					<FaPlus />
					<span>새 모임</span>
				</NewAppointmentBtn>
			</ButtonContainer>
		</Container>
	);
};

export default CalendarHeader;
