import React from 'react';
import { Container } from './style';
import WeekHeader from './WeekHeader';
import Schedule from './Schedule';

const WeeklyCalendar: React.FC = () => {
	return (
		<Container>
			<WeekHeader />
			<Schedule />
		</Container>
	);
};

export default WeeklyCalendar;
