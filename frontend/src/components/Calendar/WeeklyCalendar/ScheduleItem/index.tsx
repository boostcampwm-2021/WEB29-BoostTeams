import React from 'react';
import { Container } from './style';
import { Palette } from '../../../../utils/constants';

interface ScheduleItemProps {
	scheduleInfo: { title: string; len: number; start: number; color: number };
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ scheduleInfo }) => {
	return (
		<Container
			len={scheduleInfo.len}
			start={scheduleInfo.start}
			color={Palette[scheduleInfo.color]}
			borderColor={Palette[scheduleInfo.color + 6]}
		>
			<span>{scheduleInfo.title}</span>
		</Container>
	);
};

export default ScheduleItem;
