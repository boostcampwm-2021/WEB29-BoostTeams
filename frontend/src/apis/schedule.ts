import { toast } from 'react-toastify';
import { ScheduleType, ScheduleReqType, ScheduleResType } from '@src/types/calendar';
import fetchApi from '@utils/fetch';

export const getSchedules = async (teamId: number, firstDate: string, lastDate: string): Promise<ScheduleType[]> => {
	try {
		const res = await fetchApi.get(`/api/schedules?team_id=${teamId}&start_date=${firstDate}&end_date=${lastDate}`);
		if (res.status === 404) throw new Error('π£ μΌμ μ κ°μ Έμ¬ μ μμ΅λλ€!');
		else if (res.status === 403) throw new Error('π£ κΆνμ΄ μμ΅λλ€!');
		const data = await res.json();
		const scheduleData: ScheduleType[] = data.map(scheduleSnakeToCamel);
		return scheduleData;
	} catch (err) {
		toast.error((err as Error).message);
		return [];
	}
};

export const createNewSchedule = async (newSchedule: ScheduleReqType): Promise<ScheduleType[]> => {
	try {
		const res = await fetchApi.post('/api/schedules', { ...newSchedule });
		if (res.status === 409) throw new Error('π£ μΌμ  μΆκ°μ μ€ν¨νμμ΅λλ€!');
		else if (res.status === 403) throw new Error('π£ κΆνμ΄ μμ΅λλ€!');
		const data = await res.json();
		const scheduleData: ScheduleType[] = data.map(scheduleSnakeToCamel);
		return scheduleData;
	} catch (err) {
		toast.error((err as Error).message);
		return [];
	}
};

export const updateSchedule = async (
	scheduleId: number,
	newSchedule: ScheduleReqType,
): Promise<ScheduleType | undefined> => {
	try {
		const res = await fetchApi.put(`/api/schedules/${scheduleId}`, { ...newSchedule });
		if (res.status === 409) throw new Error('π£ μΌμ  μμ μ μ€ν¨νμμ΅λλ€!');
		else if (res.status === 403) throw new Error('π£ κΆνμ΄ μμ΅λλ€!');
		const data = await res.json();
		const scheduleData = scheduleSnakeToCamel(data);
		return scheduleData;
	} catch (err) {
		toast.error((err as Error).message);
		return undefined;
	}
};

export const deleteSchedule = async (scheduleId: number): Promise<boolean> => {
	try {
		const res = await fetchApi.delete(`/api/schedules/${scheduleId}`);
		if (res.status === 409) throw new Error('π£ μΌμ  μ­μ μ μ€ν¨νμμ΅λλ€!');
		else if (res.status === 403) throw new Error('π£ κΆνμ΄ μμ΅λλ€!');
		return true;
	} catch (err) {
		toast.error((err as Error).message);
		return false;
	}
};

const scheduleSnakeToCamel = (schedule: ScheduleResType) => {
	return {
		scheduleId: schedule.schedule_id,
		teamId: schedule.team_id,
		title: schedule.title,
		startDate: schedule.start_date,
		endDate: schedule.end_date,
		repeatId: schedule.repeat_id,
		repeatOption: schedule.repeat_option,
		repeatCount: schedule.repeat_count,
		content: schedule.content,
		color: schedule.color,
	};
};
