import { toast } from 'react-toastify';
import { ScheduleType } from '@components/Calendar/dataStructure';
import fetchApi from '@utils/fetch';

export interface ScheduleReqType {
	schedule_id?: number;
	title?: string;
	start_date: string;
	end_date: string;
	repeat_option: number;
	repeat_count: number;
	content?: string;
	color: number;
}

export const getSchedules = async (teamId: number, firstDate: string, lastDate: string): Promise<ScheduleType[]> => {
	try {
		const res = await fetchApi.get(`/api/schedules/${teamId}?start_date=${firstDate}&end_date=${lastDate}`);
		if (res.status === 404) throw new Error('😣 일정을 가져올 수 없습니다!');
		else if (res.status === 403) throw new Error('😣 권한이 없습니다!');
		const data = await res.json();
		return data;
	} catch (err) {
		toast.error((err as Error).message);
		return [];
	}
};

export const createNewSchedule = async (teamId: number, newSchedule: ScheduleReqType): Promise<ScheduleType[]> => {
	try {
		const res = await fetchApi.post(`/api/schedules/${teamId}`, { ...newSchedule });
		if (res.status === 409) throw new Error('😣 일정 추가에 실패하였습니다!');
		else if (res.status === 403) throw new Error('😣 권한이 없습니다!');
		const data = await res.json();
		return data;
	} catch (err) {
		toast.error((err as Error).message);
		return [];
	}
};

export const updateSchedule = async (
	schedule_id: number,
	newSchedule: ScheduleReqType,
): Promise<ScheduleType | undefined> => {
	try {
		const res = await fetchApi.put(`/api/schedules/${schedule_id}`, { ...newSchedule });
		if (res.status === 409) throw new Error('😣 일정 수정에 실패하였습니다!');
		else if (res.status === 403) throw new Error('😣 권한이 없습니다!');
		const data = await res.json();
		return data;
	} catch (err) {
		toast.error((err as Error).message);
		return undefined;
	}
};

export const deleteSchedule = async (schedule_id: number): Promise<boolean> => {
	try {
		const res = await fetchApi.delete(`/api/schedules/${schedule_id}`);
		if (res.status === 409) throw new Error('😣 일정 삭제에 실패하였습니다!');
		else if (res.status === 403) throw new Error('😣 권한이 없습니다!');
		return true;
	} catch (err) {
		toast.error((err as Error).message);
		return false;
	}
};
