import moment from 'moment';
import { DateInfoType } from '../components/Calendar/dataStructure';

export const getFirstDate = (isMonthly: boolean, dateInfo: DateInfoType) =>
	isMonthly ? moment(new Date(dateInfo.year, dateInfo.month - 1, 1)) : moment(dateInfo.weeklyStartDate);

export const getLastDate = (isMonthly: boolean, dateInfo: DateInfoType) =>
	isMonthly ? moment(new Date(dateInfo.year, dateInfo.month, 0)) : moment(dateInfo.weeklyStartDate).add(7, 'days');

export const dateToFormatString = (date: Date, format: string) => moment(date).format(format).toString();

const getIsDoubleMonth = (date: moment.Moment) => date.month() !== date.add(7, 'days').month();

export const getCurrDateInfo = () => {
	const date = moment().startOf('week');
	return {
		year: date.year(),
		month: date.month() + 1,
		weeklyStartDate: date.toDate(),
		isDoubleMonth: getIsDoubleMonth(date),
	};
};

export const getPrevDateInfo = (year: number, month: number, weeklyStartDate: Date, isMonthly: boolean) => {
	if (isMonthly) {
		const date = moment([year, month - 1, 1]).subtract(1, 'months');
		return {
			year: date.year(),
			month: date.month() + 1,
			weeklyStartDate: date.startOf('week').toDate(),
			isDoubleMonth: getIsDoubleMonth(date),
		};
	}
	const date = moment(weeklyStartDate).subtract(1, 'weeks');
	return {
		year: date.year(),
		month: date.month() + 1,
		weeklyStartDate: date.toDate(),
		isDoubleMonth: getIsDoubleMonth(date),
	};
};

export const getNextDateInfo = (year: number, month: number, weeklyStartDate: Date, isMonthly: boolean) => {
	if (isMonthly) {
		const date = moment([year, month - 1, 1]).add(1, 'months');
		return {
			year: date.year(),
			month: date.month() + 1,
			weeklyStartDate: date.startOf('week').toDate(),
			isDoubleMonth: getIsDoubleMonth(date),
		};
	}
	const date = moment(weeklyStartDate).add(1, 'weeks');
	return {
		year: date.year(),
		month: date.month() + 1,
		weeklyStartDate: date.toDate(),
		isDoubleMonth: getIsDoubleMonth(date),
	};
};
