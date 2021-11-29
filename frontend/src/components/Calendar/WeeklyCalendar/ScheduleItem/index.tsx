import React from 'react';
import { useSetRecoilState } from 'recoil';

import { ModalMode, ModalSchedule } from '@stores/calendar';
import { ScheduleType } from '@src/types/calendar';
import { PrimaryPalette, SecondaryPalette } from '@utils/constants';
import { Container } from './style';

interface Props {
	start: number;
	len: number;
	schedule: ScheduleType;
	handleModalOpen: () => void;
}

const ScheduleItem: React.FC<Props> = ({ start, len, schedule, handleModalOpen }) => {
	const setModalMode = useSetRecoilState(ModalMode);
	const setModalSchedule = useSetRecoilState(ModalSchedule);
	const handleScheduleClick = () => {
		setModalMode({ mode: 'read' });
		setModalSchedule(schedule);
		handleModalOpen();
	};

	return (
		<Container
			len={len}
			start={start}
			color={PrimaryPalette[schedule.color]}
			borderColor={SecondaryPalette[schedule.color]}
			onClick={handleScheduleClick}
		>
			<span>{schedule.title}</span>
		</Container>
	);
};

export default ScheduleItem;
