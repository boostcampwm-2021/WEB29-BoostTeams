import React from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { FaChevronLeft, FaChevronRight, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import { ModalMode, ModalSchedule } from '../../../stores/calendar';
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
	handleModalOpen: () => void;
	isMonthly: boolean;
	dateInfo: DateInfoType;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ changeCalendar, handleModalOpen, isMonthly, dateInfo }) => {
	const setModalMode = useSetRecoilState(ModalMode);
	const resetModalSchedule = useResetRecoilState(ModalSchedule);

	const handleCreateModalOpen = () => {
		resetModalSchedule();
		setModalMode({ mode: 'create' });
		handleModalOpen();
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
				<NewAppointmentBtn onClick={handleCreateModalOpen}>
					<FaPlus />
					<span>새 모임</span>
				</NewAppointmentBtn>
			</ButtonContainer>
		</Container>
	);
};

export default CalendarHeader;
