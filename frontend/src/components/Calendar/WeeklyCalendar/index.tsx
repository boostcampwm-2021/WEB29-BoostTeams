import React from 'react';
import { Container } from './style';
import WeekHeader from './WeekHeader';
import Schedule from './Schedule';

const WeeklyCalendar = () => {
	return (
		<Container>
			<WeekHeader />
			<Schedule />
		</Container>
	);
};

export default WeeklyCalendar;
