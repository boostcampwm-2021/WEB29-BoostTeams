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
	repeat_id: string;
	repeat_option: number;
	content: string;
	color: number;
}

export interface TimeType {
	hour: number;
	text: string;
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
	WEEK_NUMBER: 7,
	DAY_TIME_NUMBER: 48,
	TIME_LIST: [
		{ hour: 12, text: '오전' },
		{ hour: 1, text: '오전' },
		{ hour: 2, text: '오전' },
		{ hour: 3, text: '오전' },
		{ hour: 4, text: '오전' },
		{ hour: 5, text: '오전' },
		{ hour: 6, text: '오전' },
		{ hour: 7, text: '오전' },
		{ hour: 8, text: '오전' },
		{ hour: 9, text: '오전' },
		{ hour: 10, text: '오후' },
		{ hour: 11, text: '오후' },
		{ hour: 12, text: '오후' },
		{ hour: 1, text: '오후' },
		{ hour: 2, text: '오후' },
		{ hour: 3, text: '오후' },
		{ hour: 4, text: '오후' },
		{ hour: 5, text: '오후' },
		{ hour: 6, text: '오후' },
		{ hour: 7, text: '오후' },
		{ hour: 8, text: '오후' },
		{ hour: 9, text: '오후' },
		{ hour: 10, text: '오후' },
		{ hour: 11, text: '오후' },
	],
};
