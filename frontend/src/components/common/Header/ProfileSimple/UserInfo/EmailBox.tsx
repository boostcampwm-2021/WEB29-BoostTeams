import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { LinkContainer } from './style';

type Props = {
	email: string;
};

const EmailBox: React.FC<Props> = ({ email }) => {
	return (
		<LinkContainer href={`mailto:${email}`}>
			<AiOutlineMail />
			<span>{email}</span>
		</LinkContainer>
	);
};

export default EmailBox;
