import React from 'react';

import { DateInfoType, ScheduleType } from '@src/types/calendar';

import CalendarHeader from '@components/Calendar/CalendarHeader';
import MonthlyCalendar from '@components/Calendar/MonthlyCalendar';
import WeeklyCalendar from '@components/Calendar/WeeklyCalendar';
import CalendarModal from '@components/Calendar/CalendarModal';
import { Layout } from './style';

interface Props {
	teamId: number;
	schedules: ScheduleType[];
	isMonthly: boolean;
	dateInfo: DateInfoType;
	isModalVisible: boolean;
	addSchedule: (newSchedules: ScheduleType[]) => void;
	deleteScheduleById: (id: number) => void;
	updateScheduleById: (id: number, newSchedule: ScheduleType) => void;
	handleModalOpen: () => void;
	handleModalClose: () => void;
	changeToMonthly: () => void;
	changeToWeekly: () => void;
	changeToCurrDate: () => void;
	changeToPrevDate: () => void;
	changeToNextDate: () => void;
}

const CalendarTemplate: React.FC<Props> = ({
	teamId,
	schedules,
	isMonthly,
	dateInfo,
	isModalVisible,
	addSchedule,
	deleteScheduleById,
	updateScheduleById,
	handleModalOpen,
	handleModalClose,
	changeToMonthly,
	changeToWeekly,
	changeToCurrDate,
	changeToPrevDate,
	changeToNextDate,
}) => {
	return (
		<Layout>
			<CalendarHeader
				isMonthly={isMonthly}
				dateInfo={dateInfo}
				changeToCurrDate={changeToCurrDate}
				changeToPrevDate={changeToPrevDate}
				changeToNextDate={changeToNextDate}
				changeToMonthly={changeToMonthly}
				changeToWeekly={changeToWeekly}
				handleModalOpen={handleModalOpen}
			/>
			{isMonthly ? (
				<MonthlyCalendar dateInfo={dateInfo} schedules={schedules} handleModalOpen={handleModalOpen} />
			) : (
				<WeeklyCalendar dateInfo={dateInfo} schedules={schedules} handleModalOpen={handleModalOpen} />
			)}
			{isModalVisible && (
				<CalendarModal
					handleModalClose={handleModalClose}
					addSchedule={addSchedule}
					deleteScheduleById={deleteScheduleById}
					updateScheduleById={updateScheduleById}
					teamId={teamId}
				/>
			)}
		</Layout>
	);
};
export default CalendarTemplate;
