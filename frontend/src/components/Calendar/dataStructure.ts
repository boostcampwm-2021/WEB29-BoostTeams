export interface DateInfoType {
	year: number;
	month: number;
	startDate: Date;
}

export interface Schedule {
	title: string;
	startDate: Date;
	endDate: Date;
	repeatId: string;
	content: string;
	color: number;
}

export const scheduleEx = [
	{
		title: '일정1',
		start_date: new Date(2021, 11, 3, 11, 30),
		end_date: new Date(2021, 11, 3, 13, 0),
		repeat_id: 1,
		content: '본문1',
		color: 0,
	},
	{
		title: '일정2',
		start_date: new Date(2021, 11, 5, 15, 30),
		end_date: new Date(2021, 11, 5, 18, 30),
		repeat_id: 2,
		content: '본문2',
		color: 1,
	},
	{
		title: '일정3',
		start_date: new Date(2021, 11, 4, 15, 30),
		end_date: new Date(2021, 11, 4, 17, 0),
		repeat_id: 1,
		content: '본문3',
		color: 0,
	},
	{
		title: '일정4',
		start_date: new Date(2021, 11, 1, 9, 30),
		end_date: new Date(2021, 11, 1, 11, 0),
		repeat_id: 1,
		content: '본문4',
		color: 0,
	},
	{
		title: '일정5',
		start_date: new Date(2021, 11, 4, 9, 30),
		end_date: new Date(2021, 11, 4, 10, 0),
		repeat_id: 1,
		content: '본문5',
		color: 0,
	},
];
