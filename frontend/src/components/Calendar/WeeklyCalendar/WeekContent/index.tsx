/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import { Container, TimeContainer, DaysContainer, DayContainer, DayBox, CurrTimeLine } from './style';
import { DateInfoType } from '../../dataStructure';
import ScheduleItem from '../ScheduleItem';

interface Props {
	dateInfo: DateInfoType;
	schedules: any[];
}

interface ScheduleMapType {
	title: string;
	len: number;
	start: number;
	color: number;
}

const MSEC_TO_HOUR = 60000;
const HALF_HOUR_TO_MIN = 30;
const HOUR_TO_MIN = 60;
const LINE_SPACE_PX = 2.5 * 16;
const EXTRA_SPACE_PX = 10;
const timeList: number[] = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const Schedule: React.FC<Props> = ({ dateInfo, schedules }) => {
	const [time, setTime] = useState(new Date());
	const containerRef = useRef<HTMLDivElement>(null);
	const scheduleMap: Map<number, ScheduleMapType[]> = new Map([...Array(7)].map((v, i) => [i, []]));

	const getStartY = (date: Date) => {
		return (date.getHours() * HOUR_TO_MIN + date.getMinutes()) / HALF_HOUR_TO_MIN;
	};

	const getLenY = (startDate: Date, endDate: Date) => {
		return (endDate.getTime() - startDate.getTime()) / MSEC_TO_HOUR / HALF_HOUR_TO_MIN;
	};

	schedules.forEach(({ title, start_date, end_date, color }) => {
		const startDate = new Date(start_date);
		const endDate = new Date(end_date);
		const day = startDate.getDay();
		const len = getLenY(startDate, endDate);
		const start = getStartY(startDate);
		scheduleMap.get(day)?.push({ title, len, start, color });
	});

	useEffect(() => {
		const scrollY = getStartY(new Date());
		containerRef.current?.scrollTo(0, scrollY * LINE_SPACE_PX - EXTRA_SPACE_PX);

		const timer = setInterval(() => {
			setTime(new Date());
		}, 10000);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<Container ref={containerRef}>
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
			<CurrTimeLine start={getStartY(time)} />
		</Container>
	);
};

export default Schedule;
