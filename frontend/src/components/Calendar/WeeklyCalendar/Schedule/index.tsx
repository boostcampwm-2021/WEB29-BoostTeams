/* eslint-disable camelcase */
import React from 'react';
import { Container, TimeContainer, DaysContainer, DayContainer, DayBox } from './style';
import { DateInfoType, ScheduleType, scheduleEx } from '../../dataStructure';
import ScheduleItem from '../ScheduleItem';

interface ScheduleProps {
	dateInfo: DateInfoType;
}

interface ScheduleMapType {
	title: string;
	len: number;
	start: number;
}

const MSEC_TO_HOUR = 60000;
const timeList: number[] = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const Schedule: React.FC<ScheduleProps> = ({ dateInfo }: ScheduleProps) => {
	const scheduleMap: Map<number, ScheduleMapType[]> = new Map([...Array(7)].map((v, i) => [i, []]));

	scheduleEx.forEach(({ title, start_date, end_date }) => {
		const initTime = new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate()).getTime();
		const day = start_date.getDay();
		const len = (end_date.getTime() - start_date.getTime()) / MSEC_TO_HOUR / 30;
		const start = (start_date.getTime() - initTime) / MSEC_TO_HOUR / 30;
		scheduleMap.get(day)?.push({ title, len, start });
	});

	return (
		<Container>
			<TimeContainer>
				{timeList.map((hour) => (
					<div>
						<span>오전 {hour}시</span>
					</div>
				))}
				{timeList.map((hour) => (
					<div>
						<span>오후 {hour}시</span>
					</div>
				))}
			</TimeContainer>
			<DaysContainer>
				{[...Array(7)].map((v, i) => (
					<DayContainer>
						{[...Array(48)].map(() => (
							<DayBox />
						))}
						{scheduleMap.get(i)?.map((scheduleInfo) => (
							<ScheduleItem scheduleInfo={scheduleInfo} />
						))}
					</DayContainer>
				))}
			</DaysContainer>
		</Container>
	);
};

export default Schedule;
