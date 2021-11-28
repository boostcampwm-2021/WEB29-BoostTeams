import React from 'react';
import moment from 'moment';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { ModalMode, ModalSchedule } from '@stores/calendar';
import { ColorCode } from '@utils/constants';
import { DateInfoType, weekContentNumber } from '@src/types/calendar';

import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';
import NewAppointmentBtn from '@components/common/Button';
import { Container, InfoContainer, TodayBtn, ConvertBtn, ConvertBtnContainer, ButtonContainer } from './style';

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
		const date = moment(dateInfo.weeklyStartDate).add(weekContentNumber.WEEK_NUMBER, 'days');
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
				<ConvertBtnContainer>
					<ConvertBtn focus={!isMonthly} onClick={changeToWeekly}>
						주간
					</ConvertBtn>
					<ConvertBtn focus={isMonthly} onClick={changeToMonthly}>
						월간
					</ConvertBtn>
				</ConvertBtnContainer>
				<NewAppointmentBtn
					text='+ 새 일정'
					handler={handleCreateModalOpen}
					backgroundColor={ColorCode.PRIMARY1}
					fontColor={ColorCode.WHITE}
				/>
			</ButtonContainer>
		</Container>
	);
};

export default CalendarHeader;
