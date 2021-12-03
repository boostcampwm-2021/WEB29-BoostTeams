import React from 'react';
import moment from 'moment';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { ModalMode, ModalSchedule } from '@stores/calendar';
import { DateInfoType } from '@src/types/calendar';
import { WeekContentNumber } from '@utils/constants';

import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaRegCalendarPlus } from 'react-icons/fa';
import {
	Container,
	InfoContainer,
	TodayBtn,
	ConvertBtn,
	ConvertBtnContainer,
	ButtonContainer,
	NewAppointmentBtn,
} from './style';

interface Props {
	changeToCurrDate: () => void;
	changeToPrevDate: () => void;
	changeToNextDate: () => void;
	changeToMonthly: () => void;
	changeToWeekly: () => void;
	handleModalOpen: () => void;
	isMonthly: boolean;
	dateInfo: DateInfoType;
}

const CalendarHeader: React.FC<Props> = ({
	changeToCurrDate,
	changeToPrevDate,
	changeToNextDate,
	changeToMonthly,
	changeToWeekly,
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
		const date = moment(dateInfo.weeklyStartDate).add(WeekContentNumber.WEEK_NUMBER, 'days');
		return { year: date.year(), month: date.month() };
	};

	const clickHandler = () => {
		if (isMonthly) changeToWeekly();
		else changeToMonthly();
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
							{`${dateInfo.weeklyStartDate.getFullYear()}년 ${dateInfo.weeklyStartDate.getMonth() + 1}월 - 
							${nextDateInfo().year}년 ${nextDateInfo().month + 1}월`}
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
				<ConvertBtnContainer onClick={clickHandler}>
					<ConvertBtn focus={!isMonthly}>월간</ConvertBtn>
					<ConvertBtn focus={isMonthly}>주간</ConvertBtn>
				</ConvertBtnContainer>
				<NewAppointmentBtn onClick={handleCreateModalOpen}>
					<FaRegCalendarPlus />
					<span>새 일정</span>
				</NewAppointmentBtn>
			</ButtonContainer>
		</Container>
	);
};

export default CalendarHeader;
