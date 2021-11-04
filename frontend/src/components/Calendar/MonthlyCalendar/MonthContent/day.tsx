import React from 'react';
import { DayWrapper, Schedule, DayNum } from './style';
import { Palette } from '../../../../utils/constants';

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
					<Schedule onClick={showModal} color={Palette[e.color]}>
						{e.title}
					</Schedule>
				);
			})}
		</DayWrapper>
	);
};

export default Week;
