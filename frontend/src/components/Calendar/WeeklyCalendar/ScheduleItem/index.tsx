import React from 'react';
import { Container } from './style';

interface ScheduleItemProps {
	scheduleInfo: { title: string; len: number; start: number };
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ scheduleInfo }) => {
	return (
		<Container len={scheduleInfo.len} start={scheduleInfo.start}>
			<span>{scheduleInfo.title}</span>
		</Container>
	);
};

export default ScheduleItem;
