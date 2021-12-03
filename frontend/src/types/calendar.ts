export interface DateInfoType {
	year: number;
	month: number;
	weeklyStartDate: Date;
	isDoubleMonth: boolean;
}

export interface ScheduleType {
	scheduleId: number;
	teamId: number;
	title: string;
	startDate: string;
	endDate: string;
	repeatId: string;
	repeatOption: number;
	repeatCount: number;
	content: string;
	color: number;
}

export interface ScheduleModalType {
	title: string;
	color: number;
	repeatOption: number;
	startDate: string;
	endDate: string;
	content: string;
}

export interface ScheduleResType {
	schedule_id: number;
	team_id: number;
	title: string;
	start_date: string;
	end_date: string;
	repeat_id: string;
	repeat_option: number;
	repeat_count: number;
	content: string;
	color: number;
}

export interface ScheduleReqType {
	schedule_id?: number;
	title?: string;
	start_date: string;
	end_date: string;
	repeat_option: number;
	repeat_count: number;
	content?: string;
	color: number;
	team_id: number;
}

export interface TimeType {
	hour: number;
	text: string;
}
