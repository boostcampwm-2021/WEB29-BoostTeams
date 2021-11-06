import moment from 'moment';
import { DateInfoType } from '../components/Calendar/dataStructure';

export const getFirstDate = (isMonthly: boolean, dateInfo: DateInfoType) =>
	isMonthly ? moment(new Date(dateInfo.year, dateInfo.month, 1)) : moment(dateInfo.weeklyStartDate);
export const getLastDate = (isMonthly: boolean, dateInfo: DateInfoType) =>
	isMonthly ? moment(new Date(dateInfo.year, dateInfo.month, 0)) : moment(dateInfo.weeklyStartDate).add(7, 'days');

export const strToFormatString = (dateStr: string, format: string) => moment(dateStr).format(format).toString();
