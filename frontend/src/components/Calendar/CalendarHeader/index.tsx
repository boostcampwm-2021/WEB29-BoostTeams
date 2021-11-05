import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import CalendarModal from '../../common/Modal/Calendar';
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

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ changeCalendar, isMonthly, dateInfo }) => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	const handleModalOpen = () => {
		setIsModalVisible(true);
	};
	const handleModalClose = () => {
		setIsModalVisible(false);
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
				<NewAppointmentBtn onClick={handleModalOpen}>
					<FaPlus />
					<span>새 모임</span>
				</NewAppointmentBtn>
			</ButtonContainer>
			{isModalVisible && <CalendarModal initMode='create' handleModalClose={handleModalClose} />}
		</Container>
	);
};

export default CalendarHeader;
