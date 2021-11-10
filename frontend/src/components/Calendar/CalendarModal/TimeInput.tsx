import React from 'react';

import DatePicker from 'react-datepicker';
import { TimeContainer } from './style';

interface Props {
	selectedDate: Date;
	setSelectedDate: (date: Date) => void;
	checkModalMode: (mode: string) => boolean;
	selectedStartTime: Date;
	setSelectedStartTime: (date: Date) => void;
	selectedEndTime: Date;
	setSelectedEndTime: (date: Date) => void;
}

const TimeInput: React.FC<Props> = ({
	selectedDate,
	setSelectedDate,
	checkModalMode,
	selectedStartTime,
	setSelectedStartTime,
	selectedEndTime,
	setSelectedEndTime,
}) => {
	return (
		<TimeContainer>
			<DatePicker
				selected={selectedDate}
				onChange={(date: Date) => setSelectedDate(date)}
				readOnly={checkModalMode('read')}
			/>
			<DatePicker
				selected={selectedStartTime}
				onChange={(date: Date) => setSelectedStartTime(date)}
				showTimeSelect
				showTimeSelectOnly
				timeIntervals={30}
				timeCaption='Time'
				dateFormat='h:mm aa'
				readOnly={checkModalMode('read')}
			/>
			<span>&nbsp;~&nbsp;</span>
			<DatePicker
				selected={selectedEndTime}
				onChange={(date: Date) => setSelectedEndTime(date)}
				showTimeSelect
				showTimeSelectOnly
				timeIntervals={30}
				timeCaption='Time'
				dateFormat='h:mm aa'
				readOnly={checkModalMode('read')}
			/>
		</TimeContainer>
	);
};

export default TimeInput;
