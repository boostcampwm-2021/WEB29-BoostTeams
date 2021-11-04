import React from 'react';
import { WeekContainer } from './style';
import Day from './day';

interface WeekProps {
	week: number[];
	schedules: any[];
}

const Week: React.FC<WeekProps> = ({ week, schedules }: WeekProps) => {
	return (
		<WeekContainer>
			{week.map((day, idx) => (
				<Day key={day} day={day} idx={idx} schedules={schedules} />
			))}
		</WeekContainer>
	);
};

export default Week;
