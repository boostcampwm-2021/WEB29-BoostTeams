import React from 'react';
import { Container } from './style';
import { PrimaryPalette, SecondaryPalette } from '../../../../utils/constants';

interface ScheduleItemProps {
	scheduleInfo: { title: string; len: number; start: number; color: number };
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ scheduleInfo }) => {
	return (
		<Container
			len={scheduleInfo.len}
			start={scheduleInfo.start}
			color={PrimaryPalette[scheduleInfo.color]}
			borderColor={SecondaryPalette[scheduleInfo.color]}
		>
			<span>{scheduleInfo.title}</span>
		</Container>
	);
};

export default ScheduleItem;
