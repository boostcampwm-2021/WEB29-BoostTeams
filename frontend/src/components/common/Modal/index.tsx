/* eslint-disable camelcase */
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ColorCode } from '../../../utils/constants';
import { Container, ButtonContainer } from './style';
import Button from '../Button';

interface Props {
	children: React.ReactNode;
	handleModalClose: () => void;
	handleSubmit: () => void;
	removeSubmitButton: boolean;
}

const Modal: React.FC<Props> = ({ children, handleModalClose, handleSubmit, removeSubmitButton = false }) => {
	const MODAL: Element = document.getElementById('modal')!;

	return createPortal(
		<Container>
			{children}
			<ButtonContainer>
				{!removeSubmitButton && (
					<Button text='저장' handler={handleSubmit} backgroundColor={ColorCode.PRIMARY1} fontColor={ColorCode.WHITE} />
				)}
				<Button text='닫기' handler={handleModalClose} backgroundColor={ColorCode.WHITE} fontColor={ColorCode.BLACK} />
			</ButtonContainer>
		</Container>,
		MODAL,
	);
};
export default Modal;
