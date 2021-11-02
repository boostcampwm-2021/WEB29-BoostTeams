import React from 'react';
import { Container } from './style';
import WeekHeader from './WeekHeader';
import WeekContainer from './WeekContainer';

const WeeklyCalendar = () => {
	return (
		<Container>
			<WeekHeader />
			<WeekContainer />
		</Container>
	);
};

export default WeeklyCalendar;
