import React from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { WeekContentNumber, DayCode } from '@utils/constants';
import { DateInfoType } from '@src/types/calendar';
import { Container, DayContainer } from './style';

interface Props {
	dateInfo: DateInfoType;
}

const WeekHeader: React.FC<Props> = ({ dateInfo }) => {
	const dayInfo = [...Array(WeekContentNumber.WEEK_NUMBER)].map((v, i) => {
		const tDate = new Date(dateInfo.weeklyStartDate);
		tDate.setDate(tDate.getDate() + i);
		return { day: i, date: tDate.getDate() };
	});

	return (
		<Container>
			{dayInfo.map((el, i) => {
				return (
					<DayContainer
						key={uuidv4()}
						focus={moment(dateInfo.weeklyStartDate).add(i, 'days').format('YYYYMMDD') === moment().format('YYYYMMDD')}
					>
						<b>{el.date}</b>
						<span>{DayCode[el.day]}</span>
					</DayContainer>
				);
			})}
		</Container>
	);
};

export default WeekHeader;
