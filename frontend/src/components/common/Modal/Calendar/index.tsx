import React, { useState, MouseEvent, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Container } from './style';

import CalendarForm from './form';
import Button from './button';

import { createNewSchedule, ScheduleData } from '../../../../apis/calendar';

interface Props {
	initMode: string;
	setIsModalVisible: any;
}

const CalendarModal: React.FC<Props> = ({ initMode, setIsModalVisible }) => {
	// create / read
	const [modalMode, setModalMode] = useState(initMode);
	const titleElement = useRef<any>(null);
	const startDateElement = useRef<any>(null);
	const endDateElement = useRef<any>(null);
	const repeatElement = useRef<any>(null);
	const descriptionElement = useRef<any>(null);
	const colorElement = useRef<any>(null);

	const getScheduleData = (): ScheduleData => {
		return {
			title: titleElement.current.value,
			start_date: startDateElement.current.value,
			end_date: endDateElement.current.value,
			repeat_id: repeatElement.current.value,
			content: descriptionElement.current.value,
			color: colorElement.current.value,
		};
	};

	const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const newScheduleData = getScheduleData();
		// 현재 접속중인 team의 id는 어디에 저장 (recoil?)
		// team_id / newScheduleData
		createNewSchedule(1, newScheduleData);
	};
	// const createSchedule = (e: any) => {
	// 	e.preventDefault();
	// 	const formData = new FormData(e.target);
	// 	console.log(formData);
	// };
	const MODAL: Element = document.getElementById('modal')!;

	return createPortal(
		<Container>
			<CalendarForm
				titleElement={titleElement}
				startDateElement={startDateElement}
				endDateElement={endDateElement}
				repeatElement={repeatElement}
				descriptionElement={descriptionElement}
				colorElement={colorElement}
			/>
			<Button modalMode={modalMode} handleSubmit={handleSubmit} setIsModalVisible={setIsModalVisible} />
		</Container>,
		MODAL,
	);
};
export default CalendarModal;
