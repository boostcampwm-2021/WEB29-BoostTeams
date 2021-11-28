import React, { useState, useEffect, useReducer } from 'react';
import { RouteComponentProps } from 'react-router';

import { getSchedules } from '@apis/schedule';
import { getFirstDate, getLastDate, getCurrDateInfo, getPrevDateInfo, getNextDateInfo } from '@utils/calendar';
import { ScheduleType, DateInfoType } from '@src/types/calendar';

import CalendarTemplate from '@templates/CalendarTemplate';

type SchedulesAction =
	| { type: 'FETCH'; newSchedules: ScheduleType[] }
	| { type: 'ADD'; newSchedules: ScheduleType[] }
	| { type: 'DELETE'; id: number }
	| { type: 'UPDATE'; id: number; newSchedule: ScheduleType };

const schedulesReducer = (schedules: ScheduleType[], action: SchedulesAction): ScheduleType[] => {
	switch (action.type) {
		case 'FETCH':
			return [...action.newSchedules];
		case 'ADD':
			return [...schedules, ...action.newSchedules];
		case 'DELETE':
			return [...schedules.filter((schedule) => schedule.scheduleId !== action.id)];
		case 'UPDATE':
			return [...schedules.filter((schedule) => schedule.scheduleId !== action.id), action.newSchedule];
		default:
			throw new Error();
	}
};

type DateInfoAction =
	| { type: 'CURR_DATE' }
	| { type: 'PREV_DATE'; isMonthly: boolean }
	| { type: 'NEXT_DATE'; isMonthly: boolean };

const dateInfoReducer = (dateInfo: DateInfoType, action: DateInfoAction): DateInfoType => {
	switch (action.type) {
		case 'CURR_DATE':
			return getCurrDateInfo();
		case 'PREV_DATE':
			return getPrevDateInfo(dateInfo.year, dateInfo.month, dateInfo.weeklyStartDate, action.isMonthly);
		case 'NEXT_DATE':
			return getNextDateInfo(dateInfo.year, dateInfo.month, dateInfo.weeklyStartDate, action.isMonthly);
		default:
			throw new Error();
	}
};

interface MatchParams {
	teamId: string;
}
type Props = RouteComponentProps<MatchParams>;

const CalendarPage: React.FC<Props> = ({ match }) => {
	const [schedules, dispatchSchedules] = useReducer(schedulesReducer, []);
	const [dateInfo, dispatchDateInfo] = useReducer(dateInfoReducer, getCurrDateInfo());
	const [isMonthly, setIsMonthly] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const teamId = Number(match.params.teamId);

	const fetchSchedules = async () => {
		const scheduleList = await getSchedules(
			teamId,
			getFirstDate(isMonthly, dateInfo),
			getLastDate(isMonthly, dateInfo),
		);
		dispatchSchedules({ type: 'FETCH', newSchedules: scheduleList });
	};

	const addSchedule = (newSchedules: ScheduleType[]) => dispatchSchedules({ type: 'ADD', newSchedules });
	const deleteScheduleById = (id: number) => dispatchSchedules({ type: 'DELETE', id });
	const updateScheduleById = (id: number, newSchedule: ScheduleType) =>
		dispatchSchedules({ type: 'UPDATE', id, newSchedule });

	const changeToCurrDate = () => dispatchDateInfo({ type: 'CURR_DATE' });
	const changeToPrevDate = () => dispatchDateInfo({ type: 'PREV_DATE', isMonthly });
	const changeToNextDate = () => dispatchDateInfo({ type: 'NEXT_DATE', isMonthly });

	const changeToMonthly = () => setIsMonthly(true);
	const changeToWeekly = () => setIsMonthly(false);

	const handleModalOpen = () => setIsModalVisible(true);
	const handleModalClose = () => setIsModalVisible(false);

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
			changeToCurrDate={changeToCurrDate}
			changeToPrevDate={changeToPrevDate}
			changeToNextDate={changeToNextDate}
			changeToMonthly={changeToMonthly}
			changeToWeekly={changeToWeekly}
			handleModalOpen={handleModalOpen}
			handleModalClose={handleModalClose}
		/>
	);
};

export default CalendarPage;
