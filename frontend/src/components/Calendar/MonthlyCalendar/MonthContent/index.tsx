import React from 'react';
import { DayWrapper } from './style';
import { WeekContainer, Schedule } from '../style';
import { DateInfoType } from '../../dataStructure';
import { scheduleEx } from '../../dataStructure';

interface MonthContentProps {
	dateInfo: DateInfoType;
}

const MonthContent: React.FC<MonthContentProps> = ({ dateInfo }: MonthContentProps) => {
	const getFirstDay = (month: number, year: number): number => new Date(`${year}-${month}-01`).getDay();
	const firstDay = getFirstDay(dateInfo.month, dateInfo.year);
	const lastDay = new Date(dateInfo.year, dateInfo.month, 0).getDate();

	const getScheduleByDay = (day: number) => scheduleEx.filter((obj) => obj.start_date.getDate() === day);

	const showModal = (e: any): void => {
		const result = scheduleEx.find((obj): boolean => {
			if (obj.title === e.target.innerText) return true;
			return false;
		});
		console.log(result?.title, result?.start_date, result?.end_date, result?.content);
	};

	const generateDays = (): number[][] => {
		let curDay = 1;
		const result: number[][] = [];
		const week: number[] = [];
		// 첫 주이지만 전 달인 요일
		[...Array(firstDay)].forEach(() => {
			week.push(0);
		});
		// 1일부터 첫주 마지막까지
		[...Array(7 - firstDay)].forEach(() => {
			week.push(curDay);
			curDay += 1;
		});
		result.push(week);

		// 마지막주까지 쭉
		while (curDay <= lastDay) {
			const week: number[] = [];
			let day = curDay;
			// 무조건 1주를 채우도록
			[...Array(7)].forEach(() => {
				if (day <= lastDay) {
					week.push(day);
					day += 1;
				} else {
					week.push(0);
				}
			});
			result.push(week);
			curDay = day;
		}
		return result;
	};
	return (
		<div>
			{generateDays().map((week) => {
				return (
					<WeekContainer>
						{week.map((day, idx) => (
							<DayWrapper className={idx === 0 ? 'sunday' : ''}>
								{day !== 0 ? day : null}
								{getScheduleByDay(day).map((e, idx) => {
									return (
										<Schedule onClick={showModal} color='orange'>
											{e.title}
										</Schedule>
									);
								})}
							</DayWrapper>
						))}
					</WeekContainer>
				);
			})}
		</div>
	);
};

export default MonthContent;
