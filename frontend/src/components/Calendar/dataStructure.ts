/* eslint-disable camelcase */
export interface DateInfoType {
	year: number;
	month: number;
	startDate: Date;
}

export interface ScheduleType {
	id: number;
	title: string;
	start_date: Date;
	end_date: Date;
	repeat_id: number;
	content: string;
	color: number;
}

// 월은 0부터 시작
export const scheduleEx: ScheduleType[] = [
	{
		id: 0,
		title: '일정1',
		start_date: new Date(2021, 10, 3, 11, 30),
		end_date: new Date(2021, 10, 3, 13, 0),
		repeat_id: 1,
		content: '본문1',
		color: 0,
	},
	{
		id: 1,
		title: '일정2',
		start_date: new Date(2021, 10, 5, 15, 30),
		end_date: new Date(2021, 10, 5, 18, 30),
		repeat_id: 2,
		content: '본문2',
		color: 1,
	},
	{
		id: 2,
		title: '일정3',
		start_date: new Date(2021, 10, 3, 15, 15),
		end_date: new Date(2021, 10, 3, 17, 0),
		repeat_id: 1,
		content: '본문3',
		color: 2,
	},
	{
		id: 3,
		title: '일정4',
		start_date: new Date(2021, 10, 1, 9, 30),
		end_date: new Date(2021, 10, 1, 11, 0),
		repeat_id: 1,
		content: '본문4',
		color: 3,
	},
];
