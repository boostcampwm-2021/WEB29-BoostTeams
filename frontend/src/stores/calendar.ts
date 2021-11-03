import { atom } from 'recoil';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;

const calendarState = atom({
	key: 'calendarState',
	default: { year, month, startDate: date },
});

export default calendarState;
