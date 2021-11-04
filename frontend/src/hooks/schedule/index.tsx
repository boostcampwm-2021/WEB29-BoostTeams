import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { DateInfoType } from '../../components/Calendar/dataStructure';

type ReturnType = [DateInfoType, any];

export const useDate = (): ReturnType => {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const [state, setState] = useState({ year, month, startDate: moment().startOf('week').toDate() });

	// useEffect(() => {}, [state]);

	return [state, setState];
};
