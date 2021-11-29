import React from 'react';
import { ColorCode } from '@utils/constants';
import { Container, ButtonContainer, Title } from './style';
import Button from '../../Button';

export interface Props {
	title: string | undefined;
	handleModalClose: () => void;
	handleSubmit: () => void;
	removeSubmitButton: boolean;
	submitBtnName: string;
	closeBtnName: string;
}

const FormModal: React.FC<Props> = ({
	children,
	title,
	handleModalClose,
	handleSubmit,
	removeSubmitButton = false,
	submitBtnName,
	closeBtnName,
}) => {
	return (
		<Container>
			{title && <Title>{title}</Title>}
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
export default FormModal;
