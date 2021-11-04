import React from 'react';
import { Container, DayContainer } from './style';
import { DateInfoType } from '../../dataStructure';

enum DayCode {
	'일요일' = 0,
	'월요일' = 1,
	'화요일' = 2,
	'수요일' = 3,
	'목요일' = 4,
	'금요일' = 5,
	'토요일' = 6,
}

interface WeekHeaderProps {
	dateInfo: DateInfoType;
}

const WeekHeader: React.FC<WeekHeaderProps> = ({ dateInfo }: WeekHeaderProps) => {
	const dayInfo = [...Array(7)].map((v, i) => {
		const tDay = new Date(dateInfo.startDate.valueOf());
		tDay.setDate(tDay.getDate() + i);
		return { day: i, date: tDay.getDate() };
	});

	return (
		<Container>
			{dayInfo.map((el) => {
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
