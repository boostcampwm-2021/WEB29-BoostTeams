import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DateInfoType, ScheduleType, TimeType } from '@src/types/calendar';
import { WeekContentNumber } from '@utils/constants';
import { isTodayDate, isSameDate } from '@utils/calendar';
import ScheduleItem from '../ScheduleItem';
import { Container, TimeContainer, DaysContainer, DayContainer, TimeBlock, CurrTimeLine } from './style';

interface Props {
	dateInfo: DateInfoType;
	schedules: ScheduleType[];
	handleModalOpen: () => void;
}

interface TimeListProps {
	timeList: TimeType[];
	renderItem: (item: TimeType) => unknown;
}

const {
	MSEC_TO_HOUR,
	HALF_HOUR_TO_MIN,
	HOUR_TO_MIN,
	LINE_SPACE_PX,
	EXTRA_SPACE_PX,
	TIME_LIST,
	WEEK_NUMBER,
	DAY_TIME_NUMBER,
} = WeekContentNumber;

const TimeListGenerator: React.FC<TimeListProps> = ({ timeList, renderItem }) => {
	return <TimeContainer>{timeList.map((item: { hour: number; text: string }) => renderItem(item))}</TimeContainer>;
};

const Schedule: React.FC<Props> = ({ dateInfo, schedules = [], handleModalOpen }) => {
	const [time, setTime] = useState(new Date());
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
			<TimeListGenerator
				timeList={TIME_LIST}
				renderItem={(item) => (
					<div key={uuidv4()}>
						<span>
							{item.text} {item.hour}시
						</span>
					</div>
				)}
			/>
			<DaysContainer>
				{[...Array(WEEK_NUMBER)].map((v, i) => (
					<DayContainer key={uuidv4()} focus={isTodayDate(dateInfo.weeklyStartDate, i)}>
						{[...Array(DAY_TIME_NUMBER)].map(() => (
							<TimeBlock key={uuidv4()} />
						))}
						{schedules
							.filter((schedule) => isSameDate(dateInfo.weeklyStartDate, i, new Date(schedule.startDate)))
							.map((schedule) => (
								<ScheduleItem
									key={schedule.scheduleId}
									schedule={schedule}
									start={getStartY(new Date(schedule.startDate))}
									len={getLenY(new Date(schedule.startDate), new Date(schedule.endDate))}
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
