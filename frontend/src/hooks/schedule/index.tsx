import React, { useState } from 'react';
import { DateInfoType } from '../../components/Calendar/dataStructure';
import { getCurrDateInfo } from '../../utils/calendar';

type ReturnType = [DateInfoType, any];

export const useDate = (): ReturnType => {
	const [state, setState] = useState(getCurrDateInfo());

	return [state, setState];
};
