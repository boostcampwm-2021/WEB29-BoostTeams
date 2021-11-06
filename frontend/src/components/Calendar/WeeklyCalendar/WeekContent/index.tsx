/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Container, TimeContainer, DaysContainer, DayContainer, DayBox, CurrTimeLine } from './style';
import { DateInfoType, weekContentNumber, ScheduleType } from '../../dataStructure';
import ScheduleItem from '../ScheduleItem';

interface Props {
	dateInfo: DateInfoType;
	schedules: ScheduleType[];
	handleModalOpen: () => void;
}

const { MSEC_TO_HOUR, HALF_HOUR_TO_MIN, HOUR_TO_MIN, LINE_SPACE_PX, EXTRA_SPACE_PX, TIME_LIST } = weekContentNumber;

const Schedule: React.FC<Props> = ({ dateInfo, schedules, handleModalOpen }) => {
	const [time, setTime] = useState<Date>(new Date());
	const containerRef = useRef<HTMLDivElement>(null);

	const getStartY = (date: Date) => {
		return (date.getHours() * HOUR_TO_MIN + date.getMinutes()) / HALF_HOUR_TO_MIN;
	};
	const getLenY = (startDate: Date, endDate: Date) => {
		return (endDate.getTime() - startDate.getTime()) / MSEC_TO_HOUR / HALF_HOUR_TO_MIN;
	};

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
				{TIME_LIST.map((hour: number) => (
					<div key={uuidv4()}>
						<span>오전 {hour}시</span>
					</div>
				))}
				{TIME_LIST.map((hour: number) => (
					<div key={uuidv4()}>
						<span>오후 {hour}시</span>
					</div>
				))}
			</TimeContainer>
			<DaysContainer>
				{[...Array(7)].map((v, i) => (
					<DayContainer key={uuidv4()}>
						{[...Array(48)].map(() => (
							<DayBox key={uuidv4()} />
						))}
						{schedules
							.filter((schedule) => new Date(schedule.start_date).getDay() === i)
							.map((schedule) => (
								<ScheduleItem
									key={schedule.schedule_id}
									schedule={schedule}
									start={getStartY(new Date(schedule.start_date))}
									len={getLenY(new Date(schedule.start_date), new Date(schedule.end_date))}
									handleModalOpen={handleModalOpen}
								/>
							))}
					</DayContainer>
				))}
			</DaysContainer>
			<CurrTimeLine start={getStartY(time)} />
		</Container>
	);
};

export default Schedule;
