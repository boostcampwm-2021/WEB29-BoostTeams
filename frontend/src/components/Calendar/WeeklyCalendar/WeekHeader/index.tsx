import React from 'react';
import { Container, DayContainer } from './style';

enum DayCode {
	'일요일' = 0,
	'월요일' = 1,
	'화요일' = 2,
	'수요일' = 3,
	'목요일' = 4,
	'금요일' = 5,
	'토요일' = 6,
}

interface DateInfo {
	day: number;
	date: number;
}

// 나중에 날짜 정보로 변경
const dateInfo: DateInfo[] = [
	{ day: 0, date: 31 },
	{ day: 1, date: 1 },
	{ day: 2, date: 2 },
	{ day: 3, date: 3 },
	{ day: 4, date: 4 },
	{ day: 5, date: 5 },
	{ day: 6, date: 6 },
];

const WeekHeader: React.FC = () => {
	return (
		<Container>
			{dateInfo.map((el) => {
				return (
					<DayContainer>
						<b>{el.date}</b>
						<span>{DayCode[el.day]}</span>
					</DayContainer>
				);
			})}
		</Container>
	);
};

export default WeekHeader;
