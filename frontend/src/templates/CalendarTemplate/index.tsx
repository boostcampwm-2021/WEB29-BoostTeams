import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { getFirstDay, getLastDay } from './utils';
import { useDate } from '../../hooks/schedule';
import UserState from '../../stores/user';

import { Header, Navbar } from '../../components/common';
import { Layout, MainContainer, CalendarContainer } from './style';
import CalendarHeader from '../../components/Calendar/CalendarHeader';
import MonthlyCalendar from '../../components/Calendar/MonthlyCalendar';
import WeeklyCalendar from '../../components/Calendar/WeeklyCalendar';

import { getSchedules } from '../../apis/calendar';

const Calendar: React.FC = () => {
	// 달력에서 보여줄 기준 날짜
	const [dateInfo, setDateInfo] = useDate();

	// 월간 달력 ? 주간 달력 ? moment().startOf('month');
	const [isMonthly, setIsMonthly] = useState(false);
	const changeCalendar = () => setIsMonthly(!isMonthly);

	// 일정(obj) 배열
	const [schedules, setSchedules] = useState<any>([]);

	const teamId = useRecoilValue(UserState).team_id;
	const fetchSchedules = async () => {
		const param = {
			teamId,
			firstDay: getFirstDay(isMonthly, dateInfo).format('YYYYMMDD'),
			lastDay: getLastDay(isMonthly, dateInfo).format('YYYYMMDD'),
		};
		const response = await getSchedules(param);
		const json = await response.json();
		setSchedules(json);
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
