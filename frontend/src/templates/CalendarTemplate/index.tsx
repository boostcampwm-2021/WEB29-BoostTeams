import React, { useState } from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import { Layout, MainContainer, CalendarContainer } from './style';
import CalendarHeader from '../../components/Calendar/CalendarHeader';
import MonthlyCalendar from '../../components/Calendar/MonthlyCalendar';
import WeeklyCalendar from '../../components/Calendar/WeeklyCalendar';

const Calendar = () => {
	const [monthly, setMonthly] = useState(false);
	const changeCalendar = () => {
		setMonthly(!monthly);
	};
	return (
		<Layout>
			<Header />
			<MainContainer>
				<Navbar />
				<CalendarContainer>
					<CalendarHeader changeCalendar={changeCalendar} monthly={monthly} />
					{monthly ? <MonthlyCalendar /> : <WeeklyCalendar />}
				</CalendarContainer>
			</MainContainer>
		</Layout>
	);
};
export default Calendar;
