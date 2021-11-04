import React from 'react';
import { FormContainer, TitleContainer, TimeContainer } from './style';

interface Props {
	titleElement: any;
	startDateElement: any;
	endDateElement: any;
	repeatElement: any;
	colorElement: any;
	descriptionElement: any;
}

const CalendarForm: React.FC<Props> = ({
	titleElement,
	startDateElement,
	endDateElement,
	repeatElement,
	colorElement,
	descriptionElement,
}) => {
	return (
		<FormContainer>
			<TitleContainer>
				<select ref={colorElement} name='repeat'>
					<option value='1'>빨강</option>
					<option value='2'>파랑</option>
					<option value='3'>초록</option>
				</select>
				<input ref={titleElement} placeholder='제목을 입력해 주세요' />
			</TitleContainer>
			<TimeContainer>
				<input ref={startDateElement} type='datetime-local' />
				<input ref={endDateElement} type='datetime-local' />
			</TimeContainer>
			<select ref={repeatElement} name='repeat'>
				<option value='1'>매일 반복</option>
				<option value='2'>매주 반복</option>
				<option value='3'>매달 반복</option>
			</select>
			<input ref={descriptionElement} placeholder='설명을 입력해 주세요' />
		</FormContainer>
	);
};

export default CalendarForm;
