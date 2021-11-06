import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { getFirstDate, getLastDate } from './utils';
import { useDate } from '../../hooks/schedule';
import UserState from '../../stores/user';
import { getSchedules } from '../../apis/schedule';
import { ScheduleType } from '../../components/Calendar/dataStructure';

import { Header, Navbar } from '../../components/common';
import CalendarHeader from '../../components/Calendar/CalendarHeader';
import MonthlyCalendar from '../../components/Calendar/MonthlyCalendar';
import WeeklyCalendar from '../../components/Calendar/WeeklyCalendar';
import { Layout, MainContainer, CalendarContainer } from './style';

const Calendar: React.FC = () => {
	const [isMonthly, setIsMonthly] = useState<boolean>(false);
	const [schedules, setSchedules] = useState<ScheduleType[]>([]);
	const [dateInfo, setDateInfo] = useDate();

	const changeCalendar = () => setIsMonthly(!isMonthly);

	const teamId = useRecoilValue(UserState).team_id;
	const firstDate = getFirstDate(isMonthly, dateInfo).format('YYYYMMDD');
	const lastDate = getLastDate(isMonthly, dateInfo).format('YYYYMMDD');

	const fetchSchedules = async () => {
		const scheduleList = await getSchedules(teamId, firstDate, lastDate);
		setSchedules(scheduleList);
	};

	useEffect(() => {
		fetchSchedules();
	}, []);

	return (
		<Layout>
			<Header />
			<MainContainer>
				<Navbar />
				<CalendarContainer>
					<CalendarHeader changeCalendar={changeCalendar} isMonthly={isMonthly} dateInfo={dateInfo} />
					{isMonthly ? (
						<MonthlyCalendar dateInfo={dateInfo} schedules={schedules} />
					) : (
						<WeeklyCalendar dateInfo={dateInfo} schedules={schedules} />
					)}
				</CalendarContainer>
			</MainContainer>
		</Layout>
	);
};
export default Calendar;
