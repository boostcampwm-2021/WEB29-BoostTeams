import React from 'react';
import moment from 'moment';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { FaChevronLeft, FaChevronRight, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import { ModalMode, ModalSchedule } from '../../../stores/calendar';
import { Container, InfoContainer, TodayBtn, NewAppointmentBtn, ConvertCalenderBtn, ButtonContainer } from './style';
import { DateInfoType } from '../dataStructure';

interface Props {
	changeToCurrDate: () => void;
	changeToPrevDate: () => void;
	changeToNextDate: () => void;
	changeCalendar: () => void;
	handleModalOpen: () => void;
	isMonthly: boolean;
	dateInfo: DateInfoType;
}

const CalendarHeader: React.FC<Props> = ({
	changeToCurrDate,
	changeToPrevDate,
	changeToNextDate,
	changeCalendar,
	handleModalOpen,
	isMonthly,
	dateInfo,
}) => {
	const setModalMode = useSetRecoilState(ModalMode);
	const resetModalSchedule = useResetRecoilState(ModalSchedule);

	const handleCreateModalOpen = () => {
		resetModalSchedule();
		setModalMode({ mode: 'create' });
		handleModalOpen();
	};

	const nextDateInfo = () => {
		const date = moment(dateInfo.weeklyStartDate).add(7, 'days');
		return { year: date.year(), month: date.month() };
	};

	return (
		<Container>
			<InfoContainer>
				<TodayBtn onClick={changeToCurrDate}>
					<FaCalendarAlt />
					<span>오늘</span>
				</TodayBtn>
				<FaChevronLeft onClick={changeToPrevDate} />
				<div>
					{!isMonthly && dateInfo.isDoubleMonth ? (
						<span>
							{dateInfo.weeklyStartDate.getFullYear()}년 {dateInfo.weeklyStartDate.getMonth() + 1}월 -{' '}
							{nextDateInfo().year}년 {nextDateInfo().month + 1}월
						</span>
					) : (
						<span>
							{dateInfo.year}년 {dateInfo.month}월
						</span>
					)}
				</div>
				<FaChevronRight onClick={changeToNextDate} />
			</InfoContainer>
			<ButtonContainer>
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
