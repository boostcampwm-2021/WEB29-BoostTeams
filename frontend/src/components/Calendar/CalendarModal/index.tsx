import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import moment from 'moment';
import { toast } from 'react-toastify';

import { ScheduleType, ScheduleReqType, ScheduleModalType } from '@src/types/calendar';
import { ModalMode, ModalSchedule } from '@stores/calendar';
import { createNewSchedule, deleteSchedule, updateSchedule } from '@apis/schedule';
import { PrimaryPalette } from '@utils/constants';
import { dateToFormatString, isNum } from '@utils/calendar';

import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { ColorCircle } from '@components/common/ColorPicker/style';
import { ColorPicker, DropDown, Modal } from '@components/common';
import TimeInput from './TimeInput';
import { FormContainer, TitleContainer, ButtonContainer } from './style';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
	handleModalClose: () => void;
	addSchedule: (newSchedules: ScheduleType[]) => void;
	deleteScheduleById: (id: number) => void;
	updateScheduleById: (id: number, newSchedule: ScheduleType) => void;
	teamId: number;
}

const CalendarModal: React.FC<Props> = ({
	handleModalClose,
	addSchedule,
	deleteScheduleById,
	updateScheduleById,
	teamId,
}) => {
	const repeatOptions: string[] = ['반복안함', '매일반복', '매주반복', '매월반복'];

	const { scheduleId } = useRecoilValue(ModalSchedule);
	const modalSchedule = useRecoilValue(ModalSchedule);
	const [modalMode, setModalMode] = useRecoilState(ModalMode);

	const [selectedColor, setSelectedColor] = useState(0);
	const [selectedRepeat, setSelectedRepeat] = useState(0);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedStartTime, setSelectedStartTime] = useState(new Date());
	const [selectedEndTime, setSelectedEndTime] = useState(new Date());
	const [defaultTitle, setDefaultTitle] = useState('');
	const [defaultContent, setDefaultContent] = useState('');
	const [selectedRepeatCount, setSelectedRepeatCount] = useState(0);

	const titleRef = useRef<HTMLInputElement>(null);
	const contentRef = useRef<HTMLTextAreaElement>(null);

	const getScheduleData = (): ScheduleReqType => {
		return {
			color: selectedColor,
			title: titleRef.current?.value,
			start_date: moment(
				`${dateToFormatString(selectedDate, 'YYYY-MM-DD')} ${dateToFormatString(selectedStartTime, 'HH:mm')}`,
				'YYYY-MM-DD hh:mm',
			).toString(),
			end_date: moment(
				`${dateToFormatString(selectedDate, 'YYYY-MM-DD')} ${dateToFormatString(selectedEndTime, 'HH:mm')}`,
				'YYYY-MM-DD hh:mm',
			).toString(),
			repeat_option: selectedRepeat,
			repeat_count: isNum(selectedRepeatCount) ? selectedRepeatCount : 1,
			content: contentRef.current?.value,
			team_id: teamId,
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

	const checkModalMode = (mode: string): boolean => modalMode.mode === mode;

	const handleSubmit = async () => {
		const newScheduleData = getScheduleData();
		if (validateSchedule(newScheduleData)) {
			if (checkModalMode('create')) {
				const newSchedules = await createNewSchedule(newScheduleData);
				addSchedule(newSchedules);
			} else {
				newScheduleData.schedule_id = scheduleId;
				const newSchedule = await updateSchedule(scheduleId, newScheduleData);
				if (newSchedule) updateScheduleById(scheduleId, newSchedule);
			}
			handleModalClose();
		}
	};

	const handleDeleteButtonClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		await deleteSchedule(scheduleId);
		deleteScheduleById(scheduleId);
		handleModalClose();
	};

	const changeUpdateMode = async (e: React.MouseEvent) => {
		e.preventDefault();
		setModalMode({ mode: 'update' });
	};

	const checkValidateRepeatCount = (e: React.FormEvent<HTMLInputElement>) => {
		if (selectedRepeat === 0 || !isNum(e.currentTarget.value)) {
			e.currentTarget.value = '';
			setSelectedRepeatCount(0);
		} else {
			setSelectedRepeatCount(Number(e.currentTarget.value));
		}
	};

	const setScheduleState = ({ title, color, repeatOption, startDate, endDate, content }: ScheduleModalType) => {
		setSelectedColor(color);
		setSelectedRepeat(repeatOption);
		setSelectedDate(new Date(startDate));
		setSelectedStartTime(new Date(startDate));
		setSelectedEndTime(new Date(endDate));
		setDefaultTitle(title);
		setDefaultContent(content);
	};

	useEffect(() => {
		const { title, color, repeatOption, startDate, endDate, content } = modalSchedule;
		setScheduleState({ title, color, repeatOption, startDate, endDate, content });
	}, [modalMode, modalSchedule]);

	return (
		<Modal handleModalClose={handleModalClose} handleSubmit={handleSubmit} removeSubmitButton={checkModalMode('read')}>
			<FormContainer>
				<TitleContainer>
					{checkModalMode('read') ? (
						<ColorCircle color={PrimaryPalette[selectedColor]} />
					) : (
						<ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
					)}
					<input
						ref={titleRef}
						defaultValue={defaultTitle}
						placeholder='제목을 입력해 주세요.'
						readOnly={checkModalMode('read')}
					/>
				</TitleContainer>
				<TimeInput
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
					checkModalMode={checkModalMode}
					selectedStartTime={selectedStartTime}
					setSelectedStartTime={setSelectedStartTime}
					selectedEndTime={selectedEndTime}
					setSelectedEndTime={setSelectedEndTime}
				/>
				{!checkModalMode('create') ? (
					<span>{repeatOptions[selectedRepeat]}</span>
				) : (
					<>
						<DropDown
							options={repeatOptions}
							selectedOption={repeatOptions[selectedRepeat]}
							setSelectedOption={setSelectedRepeat}
						/>
						<input
							type='number'
							onChange={checkValidateRepeatCount}
							placeholder='반복횟수'
							readOnly={selectedRepeat === 0}
						/>
					</>
				)}
				<textarea
					ref={contentRef}
					defaultValue={defaultContent}
					readOnly={checkModalMode('read')}
					placeholder='설명을 입력해 주세요'
				/>
				{checkModalMode('read') && (
					<>
						<ButtonContainer>
							<FaPencilAlt onClick={changeUpdateMode} />
							<FaTrashAlt onClick={handleDeleteButtonClick} />
						</ButtonContainer>
					</>
				)}
			</FormContainer>
		</Modal>
	);
};

export default CalendarModal;
