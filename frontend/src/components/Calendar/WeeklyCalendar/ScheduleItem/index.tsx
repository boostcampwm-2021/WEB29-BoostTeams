import React from 'react';
import { Container } from './style';
import { ScheduleType } from '../../dataStructure';
import { PrimaryPalette, SecondaryPalette } from '../../../../utils/constants';

interface Props {
	start: number;
	len: number;
	schedule: ScheduleType;
}

const ScheduleItem: React.FC<Props> = ({ start, len, schedule }) => {
	const handleScheduleClick = (e) => {
		console.log(schedule);
	};

	return (
		<Container
			len={len}
			start={start}
			color={PrimaryPalette[schedule.color]}
			borderColor={SecondaryPalette[schedule.color]}
			data-schedule={schedule}
			onClick={handleScheduleClick}
		>
			<span>{schedule.title}</span>
		</Container>
	);
};

export default ScheduleItem;
