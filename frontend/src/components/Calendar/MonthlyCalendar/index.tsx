import React from 'react';
import { Container, WeekContainer, DayWrapper, DayNameWrapper, Schedule } from './style';

interface ScheduleListType {
	[x: string]: any;
	[key: number]: ScheduleContent;
}

interface ScheduleContent {
	[key: string]: string | number;
}

const MonthlyCalendar = () => {
	const getFirstDay = (month: number, year: number): number => new Date(`${year}-${month}-01`).getDay();
	const date = new Date();
	// 추후에 props로 전달해서 변경 가능하도록 구현 예정
	const y = date.getFullYear();
	const m = date.getMonth() + 1;
	const firstDay = getFirstDay(m, y);
	const lastDay = new Date(y, m, 0).getDate();
	// 추후에 해당 월의 모든 이벤트를 fetch 하는 것으로 구현 예정
	const scheduleList: ScheduleListType = [
		{ day: 15, content: '회의', color: 'blue' },
		{ day: 26, content: '한우 회식', color: 'yellow' },
		{ day: 15, content: '부장님 외근', color: 'orange' },
	];

	const generateDays = (): number[][] => {
		let curDay = 1;
		const result: number[][] = [];
		const week: number[] = [];
		// 첫 주이지만 전 달인 요일
		[...Array(firstDay)].forEach((_) => {
			week.push(0);
		});
		// 1일부터 첫주 마지막까지
		[...Array(7 - firstDay)].forEach((_) => {
			week.push(curDay);
			curDay += 1;
		});
		result.push(week);

		// 마지막주까지 쭉
		while (curDay <= lastDay) {
			const week: number[] = [];
			let day = curDay;
			// 무조건 1주를 채우도록
			[...Array(7)].forEach((_) => {
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
		<Container>
			<WeekContainer>
				{['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
					<DayNameWrapper className={idx === 0 ? 'sunday' : ''}>{day}</DayNameWrapper>
				))}
			</WeekContainer>
			{generateDays().map((week) => {
				return (
					<WeekContainer>
						{week.map((day, idx) => (
							<DayWrapper className={idx === 0 ? 'sunday' : ''}>{day !== 0 ? day : null}</DayWrapper>
						))}
					</WeekContainer>
				);
			})}
		</Container>
	);
};
// {scheduleList[day] !== undefined ? (
// <Schedule color={scheduleList[day].color}>{scheduleList[day].content}</Schedule>
// ) : null}
export default MonthlyCalendar;
