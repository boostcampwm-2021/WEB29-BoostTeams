import React from 'react';
import { Container, TimeContainer, DaysContainer, DayContainer } from './style';
import { DateInfoType } from '../../dataStructure';

interface ScheduleProps {
	dateInfo: DateInfoType;
}

const timeList: number[] = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const Schedule: React.FC<ScheduleProps> = ({ dateInfo }: ScheduleProps) => {
	return (
		<Container>
			<TimeContainer>
				{timeList.map((hour) => (
					<div>오전 {hour}시</div>
				))}
				{timeList.map((hour) => (
					<div>오후 {hour}시</div>
				))}
			</TimeContainer>
			<DaysContainer>
				{[...Array(7)].map((v) => (
					<DayContainer>
						{[...Array(48)].map((v) => (
							<div> </div>
						))}
					</DayContainer>
				))}
			</DaysContainer>
		</Container>
	);
};

export default Schedule;
