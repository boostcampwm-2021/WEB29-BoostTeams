export interface DateInfoType {
	year: number;
	month: number;
	weeklyStartDate: Date;
	isDoubleMonth: boolean;
}

export interface ScheduleType {
	schedule_id: number;
	title: string;
	start_date: string;
	end_date: string;
	repeat_id: number;
	content: string;
	color: number;
}

export enum DayCode {
	'일요일' = 0,
	'월요일' = 1,
	'화요일' = 2,
	'수요일' = 3,
	'목요일' = 4,
	'금요일' = 5,
	'토요일' = 6,
}

export const weekContentNumber: any = {
	MSEC_TO_HOUR: 60000,
	HALF_HOUR_TO_MIN: 30,
	HOUR_TO_MIN: 60,
	LINE_SPACE_PX: 2.5 * 16,
	EXTRA_SPACE_PX: 10,
	TIME_LIST: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
};
