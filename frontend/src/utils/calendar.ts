import moment from 'moment';
import { DateInfoType } from '../components/Calendar/dataStructure';

export const getFirstDate = (isMonthly: boolean, dateInfo: DateInfoType) =>
	isMonthly ? moment(new Date(dateInfo.year, dateInfo.month - 1, 1)) : moment(dateInfo.weeklyStartDate);

export const getLastDate = (isMonthly: boolean, dateInfo: DateInfoType) =>
	isMonthly ? moment(new Date(dateInfo.year, dateInfo.month, 0)) : moment(dateInfo.weeklyStartDate).add(7, 'days');

export const strToFormatString = (dateStr: string, format: string) => moment(dateStr).format(format).toString();

export const getCurrDateInfo = () => {
	const date = moment().startOf('week').toDate();
	return { year: moment().year(), month: moment().month() + 1, weeklyStartDate: date };
};

export const getPrevDateInfo = (year: number, month: number, weeklyStartDate: Date, type: string) => {
	if (type === 'monthly') {
		const date = moment([year, month - 1, 1]).subtract(1, 'months');
		return { year: date.year(), month: date.month() + 1, weeklyStartDate };
	}
	const date = moment(weeklyStartDate).subtract(1, 'weeks');
	return { year: date.year(), month: date.month() + 1, weeklyStartDate: date.toDate() };
};

export const getNextDateInfo = (year: number, month: number, weeklyStartDate: Date, type: string) => {
	if (type === 'monthly') {
		const date = moment([year, month - 1, 1]).add(1, 'months');
		return { year: date.year(), month: date.month() + 1, weeklyStartDate };
	}
	const date = moment(weeklyStartDate).add(1, 'weeks');
	return { year: date.year(), month: date.month() + 1, weeklyStartDate: date.toDate() };
};
