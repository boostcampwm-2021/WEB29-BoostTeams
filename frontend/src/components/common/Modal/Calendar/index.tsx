/* eslint-disable camelcase */
import React, { useState, useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createPortal } from 'react-dom';
import moment from 'moment';
import { toast } from 'react-toastify';

import { FaTrashAlt } from 'react-icons/fa';
import { ModalMode, ModalSchedule } from '../../../../stores/calendar';

import ColorPicker from '../../ColorPicker';
import DropDown from '../../DropDown';
import Button from '../../Button';

import { Container, FormContainer, TitleContainer, TimeContainer, ButtonContainer, DeleteButtonWrapper } from './style';
import { ColorCode } from '../../../../utils/constants';
import { strToFormatString } from '../../../../utils/calendar';
import { createNewSchedule, ScheduleReqType } from '../../../../apis/schedule';

interface Props {
	handleModalClose: () => void;
}

interface InputScheduleType {
	title: string;
	date: string;
	startTime: string;
	endTime: string;
	content: string;
}

const CalendarModal: React.FC<Props> = ({ handleModalClose }) => {
	const MODAL: Element = document.getElementById('modal')!;
	const repeatOptions: string[] = ['반복안함', '매일반복', '매주반복', '매월반복'];

	const modalMode = useRecoilValue(ModalMode).mode;
	const [modalSchedule, setModalSchedule] = useRecoilState(ModalSchedule);
	const [selectedColor, setSelectedColor] = useState<number>(0);
	const [selectedRepeat, setSelectedRepeat] = useState<number>(0);
	const [inputSchedule, setInputSchedule] = useState<InputScheduleType>();

	const titleRef = useRef<HTMLInputElement>(null);
	const dateRef = useRef<HTMLInputElement>(null);
	const startTimeRef = useRef<HTMLInputElement>(null);
	const endTimeRef = useRef<HTMLInputElement>(null);
	const contentRef = useRef<HTMLTextAreaElement>(null);

	const getScheduleData = (): ScheduleReqType => {
		return {
			color: selectedColor,
			title: titleRef.current?.value,
			start_date: moment(`${dateRef.current?.value} ${startTimeRef.current?.value}`, 'YYYY-MM-DD hh:mm').toString(),
			end_date: moment(`${dateRef.current?.value} ${endTimeRef.current?.value}`, 'YYYY-MM-DD hh:mm').toString(),
			repeat_id: selectedRepeat,
			content: contentRef.current?.value,
		};
	};

	const validateSchedule = (newScheduleData: ScheduleReqType): boolean => {
		const { title, content, start_date, end_date } = newScheduleData;
		if (!title) {
			toast.warn('😮 제목을 입력해주세요!');
			return false;
		}
		if (!content) {
			toast.warn('😮 설명을 입력해주세요!');
			return false;
		}
		if (new Date(start_date) >= new Date(end_date)) {
			toast.warn('😮 시작과 끝 시간이 올바르지 않습니다!');
			return false;
		}
		return true;
	};

	const handleSubmit = async () => {
		const newScheduleData = getScheduleData();
		if (validateSchedule(newScheduleData)) {
			createNewSchedule(1, newScheduleData);
		}
	};

	useEffect(() => {
		const { title, color, repeat_id, start_date, end_date, content } = modalSchedule;
		setSelectedColor(color);
		setSelectedRepeat(repeat_id);
		setInputSchedule({
			title,
			content,
			date: strToFormatString(start_date, 'YYYY-MM-DD'),
			startTime: strToFormatString(start_date, 'HH:mm'),
			endTime: strToFormatString(end_date, 'HH:mm'),
		});
	}, [modalMode, modalSchedule]);

	return createPortal(
		<Container>
			<FormContainer>
				<TitleContainer>
					<ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
					<input ref={titleRef} defaultValue={inputSchedule?.title} placeholder='제목을 입력해 주세요.' />
				</TitleContainer>
				<TimeContainer>
					<input ref={dateRef} type='date' defaultValue={inputSchedule?.date} />
					<input ref={startTimeRef} type='time' defaultValue={inputSchedule?.startTime} />
					<span>~</span>
					<input ref={endTimeRef} type='time' defaultValue={inputSchedule?.endTime} />
				</TimeContainer>
				<DropDown
					options={repeatOptions}
					selectedOption={repeatOptions[selectedRepeat]}
					setSelectedOption={setSelectedRepeat}
				/>
				<textarea ref={contentRef} defaultValue={inputSchedule?.content} placeholder='설명을 입력해 주세요' />
			</FormContainer>
			<ButtonContainer>
				{modalMode === 'create' ? (
					<Button text='저장' handler={handleSubmit} backgroundColor={ColorCode.PRIMARY1} fontColor={ColorCode.WHITE} />
				) : (
					<DeleteButtonWrapper>
						<FaTrashAlt />
					</DeleteButtonWrapper>
				)}
				<Button text='닫기' handler={handleModalClose} backgroundColor={ColorCode.WHITE} fontColor={ColorCode.BLACK} />
			</ButtonContainer>
		</Container>,
		MODAL,
	);
};
export default CalendarModal;
