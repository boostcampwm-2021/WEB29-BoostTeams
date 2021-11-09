import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { getFirstDate, getLastDate, getCurrDateInfo, getPrevDateInfo, getNextDateInfo } from '../../utils/calendar';
import UserState from '../../stores/user';
import { getSchedules } from '../../apis/schedule';
import { ScheduleType } from '../../components/Calendar/dataStructure';

import { Header, Navbar } from '../../components/common';
import CalendarHeader from '../../components/Calendar/CalendarHeader';
import MonthlyCalendar from '../../components/Calendar/MonthlyCalendar';
import WeeklyCalendar from '../../components/Calendar/WeeklyCalendar';
import CalendarModal from '../../components/Calendar/CalendarModal';
import { Layout, MainContainer, CalendarContainer } from './style';

const Calendar: React.FC = () => {
	const [schedules, setSchedules] = useState<ScheduleType[]>([]);
	const [dateInfo, setDateInfo] = useState(getCurrDateInfo());
	const [isMonthly, setIsMonthly] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const teamId = useRecoilValue(UserState).team_id;
	const firstDate = getFirstDate(isMonthly, dateInfo).format('YYYYMMDD');
	const lastDate = getLastDate(isMonthly, dateInfo).format('YYYYMMDD');

	const fetchSchedules = async () => {
		const scheduleList = await getSchedules(teamId, firstDate, lastDate);
		setSchedules(scheduleList);
	};

	const deleteScheduleById = (id: number) => setSchedules(schedules.filter((schedule) => schedule.schedule_id !== id));
	const addSchedule = (newSchedule: ScheduleType[]) => setSchedules([...schedules, ...newSchedule]);
	const updateScheduleById = (id: number, newSchedules: ScheduleType[]) => {
		setSchedules([...schedules.filter((schedule) => schedule.schedule_id !== id), ...newSchedules]);
	};

	const handleModalOpen = () => setIsModalVisible(true);
	const handleModalClose = () => setIsModalVisible(false);
	const changeCalendar = () => setIsMonthly(!isMonthly);

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
	}, [dateInfo, isMonthly]);

	return (
		<Layout>
			<Header />
			<MainContainer>
				<Navbar />
				<CalendarContainer>
					<CalendarHeader
						changeToCurrDate={changeToCurrDate}
						changeToPrevDate={changeToPrevDate}
						changeToNextDate={changeToNextDate}
						changeCalendar={changeCalendar}
						handleModalOpen={handleModalOpen}
						isMonthly={isMonthly}
						dateInfo={dateInfo}
					/>
					{isMonthly ? (
						<MonthlyCalendar dateInfo={dateInfo} schedules={schedules} handleModalOpen={handleModalOpen} />
					) : (
						<WeeklyCalendar dateInfo={dateInfo} schedules={schedules} handleModalOpen={handleModalOpen} />
					)}
				</CalendarContainer>
			</MainContainer>
			{isModalVisible && (
				<CalendarModal
					handleModalClose={handleModalClose}
					addSchedule={addSchedule}
					deleteScheduleById={deleteScheduleById}
					updateScheduleById={updateScheduleById}
				/>
			)}
		</Layout>
	);
};
export default Calendar;
