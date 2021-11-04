/* eslint-disable camelcase */

import fetchApi from '../utils/fetch';

export interface ScheduleData {
	title: string;
	start_date: string;
	end_date: string;
	repeat_id: number;
	content: string;
	color: number;
}

export const createNewSchedule = async (team_id: number, newSchedule: ScheduleData) => {
	const response = await fetchApi.post(`/api/schedule/${team_id}`, { ...newSchedule });
	// response로 넘어온 새로운 Schedule을 state에 update
	console.log(response);
	return response;
};

export const getSchedules = async ({
	teamId,
	firstDay,
	lastDay,
}: {
	teamId: number;
	firstDay: string;
	lastDay: string;
}) => {
	const response = await fetchApi.get(`/api/schedule/${teamId}?start_date=${firstDay}&end_date=${lastDay}`);
	return response;
};
