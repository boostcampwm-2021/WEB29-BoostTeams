import React from 'react';
import { useSetRecoilState } from 'recoil';
import { PrimaryPalette } from '@utils/constants';
import { ModalMode, ModalSchedule } from '@stores/calendar';
import { ScheduleType } from '@src/types/calendar';
import { DayWrapper, Schedule, DayNum } from './style';

interface Props {
	day: number;
	idx: number;
	schedules: ScheduleType[];
	handleModalOpen: () => void;
}

const Day: React.FC<Props> = ({ day, idx, schedules, handleModalOpen }) => {
	const getScheduleByDay = (day: number) => schedules.filter((obj) => new Date(obj.startDate).getDate() === day);
	const setModalMode = useSetRecoilState(ModalMode);
	const setModalSchedule = useSetRecoilState(ModalSchedule);
	const handleScheduleClick = (schedule: ScheduleType) => {
		setModalMode({ mode: 'read' });
		setModalSchedule(schedule);
		handleModalOpen();
	};

	return (
		<DayWrapper className={idx === 0 ? 'sunday' : ''}>
			{day !== 0 ? <DayNum>{day}</DayNum> : null}
			{getScheduleByDay(day).map((schedule) => {
				return (
					<Schedule
						key={schedule.scheduleId}
						onClick={() => handleScheduleClick(schedule)}
						color={PrimaryPalette[schedule.color]}
					>
						{schedule.title}
					</Schedule>
				);
			})}
		</DayWrapper>
	);
};

export default Day;
