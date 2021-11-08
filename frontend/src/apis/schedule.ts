/* eslint-disable camelcase */
import { toast } from 'react-toastify';
import { ScheduleType } from '../components/Calendar/dataStructure';
import fetchApi from '../utils/fetch';

export interface ScheduleReqType {
	title?: string;
	start_date: string;
	end_date: string;
	repeat_id: number;
	content?: string;
	color: number;
}

export const createNewSchedule = async (team_id: number, newSchedule: ScheduleReqType): Promise<any> => {
	try {
		const res = await fetchApi.post(`/api/schedule/${team_id}`, { ...newSchedule });
		const data = await res.json();
		// response로 넘어온 새로운 Schedule을 state에 update
		console.log(data);
		return data;
	} catch (err) {
		toast.error('😣 일정 추가에 실패하였습니다!');
		return {};
	}
};

export const getSchedules = async (teamId: number, firstDate: string, lastDate: string): Promise<any> => {
	try {
		const res = await fetchApi.get(`/api/schedule/${teamId}?start_date=${firstDate}&end_date=${lastDate}`);
		const data = await res.json();
		return data;
	} catch (err) {
		toast.error('😣 일정을 가져올 수 없습니다!');
		return [];
	}
};
