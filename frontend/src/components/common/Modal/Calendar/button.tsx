import React from 'react';
import { ButtonWrapper } from './style';

interface Props {
	modalMode: string;
	handleSubmit: any;
	setIsModalVisible: any;
}

const Button: React.FC<Props> = ({ modalMode, handleSubmit, setIsModalVisible }) => {
	return (
		<ButtonWrapper>
			{modalMode === 'create' ? (
				<button type='button' onClick={handleSubmit}>
					저장
				</button>
			) : (
				''
			)}
			<button onClick={() => setIsModalVisible(false)} type='button'>
				취소
			</button>
		</ButtonWrapper>
	);
};

export default Button;
