import { atom } from 'recoil';

export const ModalMode = atom({
	key: 'calendarModalMode',
	default: {
		mode: 'create',
	},
});

export const ModalSchedule = atom({
	key: 'calendarModalSchedule',
	default: {
		schedule_id: -1,
		color: 0,
		title: '',
		start_date: new Date().toString(),
		end_date: new Date().toString(),
		repeat_id: '',
		repeat_option: 0,
		content: '',
	},
});
