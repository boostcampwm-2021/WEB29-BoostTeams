import React from 'react';
import Button from '@components/common/Button';
import { ColorCode } from '@utils/constants';
import { Container, ButtonContainer, Title } from './style';

export interface Props {
	title: string | undefined;
	handleModalClose: () => void;
	handleSubmit: () => void;
	removeSubmitButton: boolean;
	submitBtnName: string;
	closeBtnName: string;
}

const NotificationModal: React.FC<Props> = ({
	children,
	title = '알림',
	handleModalClose,
	handleSubmit,
	removeSubmitButton = false,
	submitBtnName,
	closeBtnName,
}) => {
	return (
		<Container>
			<Title>{title}</Title>
			{children}
			<ButtonContainer>
				{!removeSubmitButton && (
					<Button
						text={submitBtnName}
						handler={handleSubmit}
						backgroundColor={ColorCode.WHITE}
						fontColor={ColorCode.RED}
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
export default NotificationModal;
