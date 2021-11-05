import React, { useState, MouseEvent, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Container, FormContainer, TitleContainer, TimeContainer, ButtonContainer } from './style';

import ColorPicker from '../../ColorPicker';
import DropDown from '../../DropDown';
import Button from '../../Button';

import { ColorCode } from '../../../../utils/constants';
import { createNewSchedule } from '../../../../apis/calendar';

interface Props {
	initMode: string;
	handleModalClose: any;
}

const CalendarModal: React.FC<Props> = ({ initMode, handleModalClose }) => {
	const MODAL: Element = document.getElementById('modal')!;
	const repeatOptions: string[] = ['반복안함', '매일반복', '매주반복', '매월반복'];

	const [modalMode, setModalMode] = useState(initMode); // create / read
	const [selectedColor, setSelectedColor] = useState<number>(0);
	const [selectedRepeat, setSelectedRepeat] = useState<string>(repeatOptions[0]);

	const titleRef = useRef<HTMLInputElement>(null);
	const dateRef = useRef<HTMLInputElement>(null);
	const startTimeRef = useRef<HTMLInputElement>(null);
	const endTimeRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<any>(null);

	const getScheduleData = (): any => {
		return {
			title: titleRef.current?.value,
			start_date: startTimeRef.current?.value,
			end_date: endTimeRef.current?.value,
			content: descriptionRef.current.value,
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

	return createPortal(
		<Container>
			<FormContainer>
				<TitleContainer>
					<ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
					<input ref={titleRef} placeholder='제목을 입력해 주세요.' />
				</TitleContainer>
				<TimeContainer>
					<input ref={dateRef} type='date' />
					<input ref={startTimeRef} type='time' />
					<span>~</span>
					<input ref={endTimeRef} type='time' />
				</TimeContainer>
				<DropDown options={repeatOptions} selectedRepeat={selectedRepeat} setSelectedOption={setSelectedRepeat} />
				<textarea ref={descriptionRef} placeholder='설명을 입력해 주세요' />
			</FormContainer>
			<ButtonContainer>
				{modalMode === 'create' ? (
					<Button text='저장' handler={handleSubmit} backgroundColor={ColorCode.PRIMARY1} fontColor={ColorCode.WHITE} />
				) : (
					''
				)}
				<Button text='취소' handler={handleModalClose} backgroundColor={ColorCode.WHITE} fontColor={ColorCode.BLACK} />
			</ButtonContainer>
		</Container>,
		MODAL,
	);
};
export default CalendarModal;
