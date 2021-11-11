import React from 'react';
import CalendarTemplate from '../../templates/CalendarTemplate';

const CalendarPage: React.FC = ({ match }: any) => {
	return <CalendarTemplate params={match.params} />;
};

export default CalendarPage;
