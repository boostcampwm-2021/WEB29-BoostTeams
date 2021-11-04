/* eslint-disable camelcase */
export interface DateInfoType {
	year: number;
	month: number;
	startDate: Date;
}

export interface ScheduleType {
	schedule_id: number;
	title: string;
	start_date: Date;
	end_date: Date;
	repeat_id: number;
	content: string;
	color: number;
	team: any;
}
