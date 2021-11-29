import moment from 'moment';
import { DateInfoType } from '@src/types/calendar';

export const getFirstDate = (isMonthly: boolean, dateInfo: DateInfoType): string =>
	isMonthly
		? moment(new Date(dateInfo.year, dateInfo.month - 1, 1)).format('YYYYMMDD')
		: moment(dateInfo.weeklyStartDate).format('YYYYMMDD');

export const getLastDate = (isMonthly: boolean, dateInfo: DateInfoType): string =>
	isMonthly
		? moment(new Date(dateInfo.year, dateInfo.month, 0)).format('YYYYMMDD')
		: moment(dateInfo.weeklyStartDate).add(7, 'days').format('YYYYMMDD');

export const dateToFormatString = (date: Date, format: string): string => moment(date).format(format).toString();

export const isTodayDate = (date: Date, i: number): boolean =>
	moment(date).add(i, 'days').format('YYYYMMDD') === moment().format('YYYYMMDD');

export const isSameDate = (date: Date, i: number, refDate: Date): boolean =>
	moment(date).add(i, 'days').format('YYYYMMDD') === moment(refDate).format('YYYYMMDD');

const isDoubleMonth = (date: moment.Moment): boolean => date.month() !== date.add(7, 'days').month();

export const getCurrDateInfo = (): DateInfoType => {
	const date = moment().startOf('week');
	return {
		year: date.year(),
		month: date.month() + 1,
		weeklyStartDate: date.toDate(),
		isDoubleMonth: isDoubleMonth(date),
	};
};

export const getPrevDateInfo = (
	year: number,
	month: number,
	weeklyStartDate: Date,
	isMonthly: boolean,
): DateInfoType => {
	if (isMonthly) {
		const date = moment([year, month - 1, 1]).subtract(1, 'months');
		return {
			year: date.year(),
			month: date.month() + 1,
			weeklyStartDate: date.startOf('week').toDate(),
			isDoubleMonth: isDoubleMonth(date),
		};
	}
	const date = moment(weeklyStartDate).subtract(1, 'weeks');
	return {
		year: date.year(),
		month: date.month() + 1,
		weeklyStartDate: date.toDate(),
		isDoubleMonth: isDoubleMonth(date),
	};
};

export const getNextDateInfo = (
	year: number,
	month: number,
	weeklyStartDate: Date,
	isMonthly: boolean,
): DateInfoType => {
	if (isMonthly) {
		const date = moment([year, month - 1, 1]).add(1, 'months');
		return {
			year: date.year(),
			month: date.month() + 1,
			weeklyStartDate: date.startOf('week').toDate(),
			isDoubleMonth: isDoubleMonth(date),
		};
	}
	const date = moment(weeklyStartDate).add(1, 'weeks');
	return {
		year: date.year(),
		month: date.month() + 1,
		weeklyStartDate: date.toDate(),
		isDoubleMonth: isDoubleMonth(date),
	};
};

export const isNum = (num: number | string): boolean => !Number.isNaN(Number(num));
