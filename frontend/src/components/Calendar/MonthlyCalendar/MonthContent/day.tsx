import React from 'react';
import { DayWrapper, Schedule, DayNum } from './style';
import { PrimaryPalette } from '../../../../utils/constants';

interface DayProps {
	day: number;
	idx: number;
	schedules: any[];
}

const Week: React.FC<DayProps> = ({ day, idx, schedules }: DayProps) => {
	const getScheduleByDay = (day: number) => schedules.filter((obj) => new Date(obj.start_date).getDate() === day);
	const showModal = (e: any): void => {
		const result = schedules.find((obj): boolean => {
			if (obj.title === e.target.innerText) return true;
			return false;
		});
		console.log(result?.title, result?.start_date, result?.end_date, result?.content);
	};
	return (
		<DayWrapper className={idx === 0 ? 'sunday' : ''}>
			{day !== 0 ? <DayNum>{day}</DayNum> : null}
			{getScheduleByDay(day).map((e) => {
				return (
					<Schedule key={e.schedule_id} onClick={showModal} color={PrimaryPalette[e.color]}>
						{e.title}
					</Schedule>
				);
			})}
		</DayWrapper>
	);
};

export default Week;
