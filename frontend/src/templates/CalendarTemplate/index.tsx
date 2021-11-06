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
import CalendarModal from '../../components/common/Modal/Calendar';
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

	const handleModalOpen = () => setIsModalVisible(true);
	const handleModalClose = () => setIsModalVisible(false);
	const changeCalendar = () => setIsMonthly(!isMonthly);

	const changeToCurrDate = () => {
		setDateInfo(getCurrDateInfo());
	};
	const changeToPrevDate = () => {
		const { year, month, weeklyStartDate } = dateInfo;
		const type = isMonthly ? 'monthly' : 'weekly';
		setDateInfo(getPrevDateInfo(year, month, weeklyStartDate, type));
	};
	const changeToNextDate = () => {
		const { year, month, weeklyStartDate } = dateInfo;
		const type = isMonthly ? 'monthly' : 'weekly';
		setDateInfo(getNextDateInfo(year, month, weeklyStartDate, type));
	};

	useEffect(() => {
		fetchSchedules();
	}, [dateInfo]);

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
						<MonthlyCalendar dateInfo={dateInfo} schedules={schedules} />
					) : (
						<WeeklyCalendar dateInfo={dateInfo} schedules={schedules} handleModalOpen={handleModalOpen} />
					)}
				</CalendarContainer>
			</MainContainer>
			{isModalVisible && <CalendarModal handleModalClose={handleModalClose} />}
		</Layout>
	);
};
export default Calendar;
