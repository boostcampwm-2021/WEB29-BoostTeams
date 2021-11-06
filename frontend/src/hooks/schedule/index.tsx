import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { DateInfoType } from '../../components/Calendar/dataStructure';

type ReturnType = [DateInfoType, any];

export const useDate = (): ReturnType => {
	const currDate = new Date();
	const year = currDate.getFullYear();
	const month = currDate.getMonth() + 1;
	const [state, setState] = useState({ year, month, weeklyStartDate: moment(currDate).startOf('week').toDate() });

	// useEffect(() => {}, [state]);

	return [state, setState];
};
