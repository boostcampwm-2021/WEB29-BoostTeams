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
		scheduleId: -1,
		color: 0,
		title: '',
		startDate: new Date().toString(),
		endDate: new Date().toString(),
		repeatId: '',
		repeatOption: 0,
		content: '',
	},
});
