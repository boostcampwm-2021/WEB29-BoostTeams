import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ContentContainer } from './style';
import { DateInfoType, ScheduleType, weekContentNumber } from '../../dataStructure';
import Week from './Week';

interface Props {
	dateInfo: DateInfoType;
	schedules: ScheduleType[];
	handleModalOpen: () => void;
}

const MonthContent: React.FC<Props> = ({ dateInfo, schedules, handleModalOpen }) => {
	const getFirstDay = (month: number, year: number): number => new Date(`${year}-${month}-01`).getDay();
	const firstDay = getFirstDay(dateInfo.month, dateInfo.year);
	const lastDay = new Date(dateInfo.year, dateInfo.month, 0).getDate();

	const generateDays = (firstDay: number, lastDay: number): number[][] => {
		let curDay = 1;
		const result: number[][] = [];
		const week: number[] = [];
		// 첫 주이지만 전 달인 요일
		[...Array(firstDay)].forEach(() => {
			week.push(0);
		});
		// 1일부터 첫주 마지막까지
		[...Array(weekContentNumber.WEEK_NUMBER - firstDay)].forEach(() => {
			week.push(curDay);
			curDay += 1;
		});
		result.push(week);

		// 마지막주까지 쭉
		while (curDay <= lastDay) {
			const week: number[] = [];
			let day = curDay;
			// 무조건 1주를 채우도록
			[...Array(weekContentNumber.WEEK_NUMBER)].forEach(() => {
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
		<ContentContainer>
			{generateDays(firstDay, lastDay).map((week) => (
				<Week key={uuidv4()} week={week} schedules={schedules} handleModalOpen={handleModalOpen} />
			))}
		</ContentContainer>
	);
};

export default MonthContent;
