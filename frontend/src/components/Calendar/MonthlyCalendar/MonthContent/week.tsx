import React from 'react';
import { v4 as uuidv4 } from 'uuid';
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
				<Day key={uuidv4()} day={day} idx={idx} schedules={schedules} />
			))}
		</WeekContainer>
	);
};

export default Week;
