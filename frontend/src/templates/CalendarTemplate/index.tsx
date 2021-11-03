import React, { useState } from 'react';
import { Header, Navbar } from '../../components/common';
import { Layout, MainContainer, CalendarContainer } from './style';
import CalendarHeader from '../../components/Calendar/CalendarHeader';
import MonthlyCalendar from '../../components/Calendar/MonthlyCalendar';
import WeeklyCalendar from '../../components/Calendar/WeeklyCalendar';

const Calendar: React.FC = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const [dateInfo, setDateInfo] = useState({ year, month, startDate: date });
	const [isMonthly, setIsMonthly] = useState(false);
	const changeCalendar = () => {
		setIsMonthly(!isMonthly);
	};
	return (
		<Layout>
			<Header />
			<MainContainer>
				<Navbar />
				<CalendarContainer>
					<CalendarHeader changeCalendar={changeCalendar} monthly={isMonthly} dateInfo={dateInfo} />
					{isMonthly ? <MonthlyCalendar dateInfo={dateInfo} /> : <WeeklyCalendar dateInfo={dateInfo} />}
				</CalendarContainer>
			</MainContainer>
		</Layout>
	);
};
export default Calendar;
