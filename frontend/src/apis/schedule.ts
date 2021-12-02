import { toast } from 'react-toastify';
import { ScheduleType, ScheduleReqType, ScheduleResType } from '@src/types/calendar';
import fetchApi from '@utils/fetch';

export const getSchedules = async (teamId: number, firstDate: string, lastDate: string): Promise<ScheduleType[]> => {
	try {
		const res = await fetchApi.get(`/api/schedules?team_id=${teamId}&start_date=${firstDate}&end_date=${lastDate}`);
		if (res.status === 404) throw new Error('😣 일정을 가져올 수 없습니다!');
		else if (res.status === 403) throw new Error('😣 권한이 없습니다!');
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
		if (res.status === 409) throw new Error('😣 일정 추가에 실패하였습니다!');
		else if (res.status === 403) throw new Error('😣 권한이 없습니다!');
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
		if (res.status === 409) throw new Error('😣 일정 수정에 실패하였습니다!');
		else if (res.status === 403) throw new Error('😣 권한이 없습니다!');
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
		if (res.status === 409) throw new Error('😣 일정 삭제에 실패하였습니다!');
		else if (res.status === 403) throw new Error('😣 권한이 없습니다!');
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
