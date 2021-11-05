import React from 'react';
import { NormalButton } from './style';

interface Props {
	text: string;
	backgroundColor: string;
	fontColor: string;
	handler: any;
}

const Button: React.FC<Props> = ({ text, backgroundColor, fontColor, handler }) => {
	return (
		<NormalButton type='button' onClick={handler} backgroundColor={backgroundColor} fontColor={fontColor}>
			{text}
		</NormalButton>
	);
};

export default Button;