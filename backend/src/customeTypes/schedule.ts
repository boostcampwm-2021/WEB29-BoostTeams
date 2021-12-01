export interface ScheduleCreateReqType {
	schedule_id: number;
	team_id: number;
	title: string;
	start_date: string;
	end_date: string;
	repeat_option: number;
	repeat_count: number;
	content: string;
	color: number;
}

export interface ScheduleUpdateReqType {
	schedule_id: number;
	title: string;
	start_date: string;
	end_date: string;
	repeat_option: number;
	repeat_count: number;
	content: string;
	color: number;
}
