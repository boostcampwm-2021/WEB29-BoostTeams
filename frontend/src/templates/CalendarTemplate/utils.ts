import moment from 'moment';
import { DateInfoType } from '../../components/Calendar/dataStructure';

export const getFirstDay = (isMonthly: boolean, dateInfo: DateInfoType) =>
	isMonthly ? moment(new Date(dateInfo.year, dateInfo.month, 1)) : moment(dateInfo.startDate);
export const getLastDay = (isMonthly: boolean, dateInfo: DateInfoType) =>
	isMonthly ? moment(new Date(dateInfo.year, dateInfo.month, 0)) : moment(dateInfo.startDate).add(7, 'days');
