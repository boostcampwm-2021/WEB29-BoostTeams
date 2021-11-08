import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { getFirstDate, getLastDate, getCurrDateInfo, getPrevDateInfo, getNextDateInfo } from '../../utils/calendar';
import { useDate } from '../../hooks/schedule';
import UserState from '../../stores/user';
import { getSchedules } from '../../apis/schedule';
import { ScheduleType } from '../../components/Calendar/dataStructure';

import { Header, Navbar } from '../../components/common';
import CalendarHeader from '../../components/Calendar/CalendarHeader';
import MonthlyCalendar from '../../components/Calendar/MonthlyCalendar';
import WeeklyCalendar from '../../components/Calendar/WeeklyCalendar';
import CalendarModal from '../../components/Calendar/CalendarModal';
import { Layout, MainContainer, CalendarContainer } from './style';

const Calendar: React.FC = () => {
	const [isMonthly, setIsMonthly] = useState<boolean>(false);
	const [schedules, setSchedules] = useState<ScheduleType[]>([]);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [dateInfo, setDateInfo] = useDate();

	const teamId = useRecoilValue(UserState).team_id;
	const firstDate = getFirstDate(isMonthly, dateInfo).format('YYYYMMDD');
	const lastDate = getLastDate(isMonthly, dateInfo).format('YYYYMMDD');

	const fetchSchedules = async () => {
		const scheduleList = await getSchedules(teamId, firstDate, lastDate);
		setSchedules(scheduleList);
	};

	const updateSchedule = (newSchedule: ScheduleType) => {
		setSchedules([...schedules, newSchedule]);
	};

	const handleModalOpen = () => setIsModalVisible(true);
	const handleModalClose = () => setIsModalVisible(false);
	const changeCalendar = () => setIsMonthly(!isMonthly);

	const changeToCurrDate = () => setDateInfo(getCurrDateInfo());
	const changeToPrevDate = () => {
		const { year, month, weeklyStartDate } = dateInfo;
		setDateInfo(getPrevDateInfo(year, month, weeklyStartDate, isMonthly));
	};
	const changeToNextDate = () => {
		const { year, month, weeklyStartDate } = dateInfo;
		setDateInfo(getNextDateInfo(year, month, weeklyStartDate, isMonthly));
	};
	// 월 -> 주 넘어갈 때 그 월의 첫째주를 보여준다?
	// 원래 10월 24일이 startdate인 주를 보고 있었는데
	// 월로 넘긴 다음에 11월로 바꾸고 다시 주로 돌아온다면
	// 11월 첫째주가 보여지는데..
	// year: month: weeklyStartDate: 첫째주의 일요일 date

	useEffect(() => {
		fetchSchedules();
	}, [dateInfo, isMonthly]);

	return (
		<Layout>
			<Header />
			<MainContainer>
				<Navbar />
				<CalendarContainer>
					<CalendarHeader
						changeToCurrDate={changeToCurrDate}
						changeToPrevDate={changeToPrevDate}
						changeToNextDate={changeToNextDate}
						changeCalendar={changeCalendar}
						handleModalOpen={handleModalOpen}
						isMonthly={isMonthly}
						dateInfo={dateInfo}
					/>
					{isMonthly ? (
						<MonthlyCalendar dateInfo={dateInfo} schedules={schedules} handleModalOpen={handleModalOpen} />
					) : (
						<WeeklyCalendar dateInfo={dateInfo} schedules={schedules} handleModalOpen={handleModalOpen} />
					)}
				</CalendarContainer>
			</MainContainer>
			{isModalVisible && <CalendarModal handleModalClose={handleModalClose} updateSchedule={updateSchedule} />}
		</Layout>
	);
};
export default Calendar;
