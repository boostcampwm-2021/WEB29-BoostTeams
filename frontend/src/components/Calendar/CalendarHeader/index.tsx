import React from 'react';
import { FaChevronLeft, FaChevronRight, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import {
	Container,
	InfoContainer,
	TodayBtn,
	NewAppointmentBtn,
	ConvertCalenderBtn,
	ButtonContainer,
	ToggleBtnWrapper,
	HiddenInput,
	Slider,
} from './style';
import { DateInfoType } from '../dataStructure';

interface CalendarHeaderProps {
	changeCalendar: () => void;
	isMonthly: boolean;
	dateInfo: DateInfoType;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
	changeCalendar,
	isMonthly,
	dateInfo,
}: CalendarHeaderProps) => {
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
				<span>
					{dateInfo.year}년 {dateInfo.month}월
				</span>
				<FaChevronRight />
			</InfoContainer>
			<ButtonContainer>
				<ToggleBtnWrapper>
					<HiddenInput type='checkbox' onChange={changeCalendar} />
					<Slider />
				</ToggleBtnWrapper>
				<ConvertCalenderBtn onClick={changeCalendar}>{isMonthly ? '주간' : '월간'}</ConvertCalenderBtn>
				<NewAppointmentBtn onClick={openModal}>
					<FaPlus />
					<span>새 모임</span>
				</NewAppointmentBtn>
			</ButtonContainer>
		</Container>
	);
};

export default CalendarHeader;
