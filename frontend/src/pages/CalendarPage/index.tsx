import React, { useState, useEffect } from 'react';
import CalendarTemplate from '../../templates/CalendarTemplate';

import { getFirstDate, getLastDate, getCurrDateInfo, getPrevDateInfo, getNextDateInfo } from '../../utils/calendar';
import { getSchedules } from '../../apis/schedule';
import { ScheduleType } from '../../components/Calendar/dataStructure';

const CalendarPage: React.FC = ({ match }: any) => {
	const [schedules, setSchedules] = useState<ScheduleType[]>([]);
	const [dateInfo, setDateInfo] = useState(getCurrDateInfo());
	const [isMonthly, setIsMonthly] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const teamId = Number(match.params.teamId);

	const fetchSchedules = async () => {
		const scheduleList = await getSchedules(
			teamId,
			getFirstDate(isMonthly, dateInfo),
			getLastDate(isMonthly, dateInfo),
		);
		setSchedules(scheduleList);
	};

	const addSchedule = (newSchedule: ScheduleType[]) => setSchedules([...schedules, ...newSchedule]);
	const deleteScheduleById = (id: number) => setSchedules(schedules.filter((schedule) => schedule.schedule_id !== id));
	const updateScheduleById = (id: number, newSchedule: ScheduleType) => {
		setSchedules([...schedules.filter((schedule) => schedule.schedule_id !== id), newSchedule]);
	};

	const handleModalOpen = () => setIsModalVisible(true);
	const handleModalClose = () => setIsModalVisible(false);
	const changeToMonthly = () => setIsMonthly(true);
	const changeToWeekly = () => setIsMonthly(false);

	const changeToCurrDate = () => setDateInfo(getCurrDateInfo());
	const changeToPrevDate = () => {
		const { year, month, weeklyStartDate } = dateInfo;
		setDateInfo(getPrevDateInfo(year, month, weeklyStartDate, isMonthly));
	};
	const changeToNextDate = () => {
		const { year, month, weeklyStartDate } = dateInfo;
		setDateInfo(getNextDateInfo(year, month, weeklyStartDate, isMonthly));
	};

	useEffect(() => {
		fetchSchedules();
	}, [dateInfo, isMonthly, teamId]);

	return (
		<CalendarTemplate
			teamId={teamId}
			schedules={schedules}
			isMonthly={isMonthly}
			dateInfo={dateInfo}
			isModalVisible={isModalVisible}
			addSchedule={addSchedule}
			deleteScheduleById={deleteScheduleById}
			updateScheduleById={updateScheduleById}
			handleModalOpen={handleModalOpen}
			handleModalClose={handleModalClose}
			changeToMonthly={changeToMonthly}
			changeToWeekly={changeToWeekly}
			changeToCurrDate={changeToCurrDate}
			changeToPrevDate={changeToPrevDate}
			changeToNextDate={changeToNextDate}
		/>
	);
};

export default CalendarPage;
