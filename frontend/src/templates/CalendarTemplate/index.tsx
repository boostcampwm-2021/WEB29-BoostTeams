import React from 'react';

import { DateInfoType, ScheduleType } from '../../components/Calendar/dataStructure';

import { Header, Navbar } from '../../components/common';
import CalendarHeader from '../../components/Calendar/CalendarHeader';
import MonthlyCalendar from '../../components/Calendar/MonthlyCalendar';
import WeeklyCalendar from '../../components/Calendar/WeeklyCalendar';
import CalendarModal from '../../components/Calendar/CalendarModal';
import { Layout, MainContainer, CalendarContainer } from './style';

interface Props {
	teamId: number;
	schedules: ScheduleType[];
	isMonthly: boolean;
	dateInfo: DateInfoType;
	isModalVisible: boolean;
	addSchedule: (newSchedule: ScheduleType[]) => void;
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
			<Header />
			<MainContainer>
				<Navbar />
				<CalendarContainer>
					<CalendarHeader
						changeToCurrDate={changeToCurrDate}
						changeToPrevDate={changeToPrevDate}
						changeToNextDate={changeToNextDate}
						changeToMonthly={changeToMonthly}
						changeToWeekly={changeToWeekly}
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
					teamId={teamId}
				/>
			)}
		</Layout>
	);
};
export default CalendarTemplate;
