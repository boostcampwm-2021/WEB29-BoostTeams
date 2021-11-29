import React from 'react';
import { ColorCode } from '@utils/constants';
import { Container, ButtonContainer } from './style';
import Button from '../../Button';

export interface Props {
	children: React.ReactNode;
	handleModalClose: () => void;
	handleSubmit: () => void;
	removeSubmitButton: boolean;
	submitBtnName: string;
	closeBtnName: string;
}

const PrimaryModal: React.FC<Props> = ({
	children,
	handleModalClose,
	handleSubmit,
	removeSubmitButton = false,
	submitBtnName,
	closeBtnName,
}) => {
	return (
		<Container>
			{children}
			<ButtonContainer>
				{!removeSubmitButton && (
					<Button
						text={submitBtnName}
						handler={handleSubmit}
						backgroundColor={ColorCode.PRIMARY1}
						fontColor={ColorCode.WHITE}
					/>
				)}
				<Button
					text={closeBtnName}
					handler={handleModalClose}
					backgroundColor={ColorCode.WHITE}
					fontColor={ColorCode.FONT_BASE}
				/>
			</ButtonContainer>
		</Container>
	);
};
export default PrimaryModal;
