import React from 'react';
import { FaRegEnvelopeOpen } from 'react-icons/fa';
import { LinkContainer } from './style';

type Props = {
	email: string;
};

const EmailBox: React.FC<Props> = ({ email }) => {
	return (
		<LinkContainer href={`mailto:${email}`}>
			<FaRegEnvelopeOpen />
			<span>{email}</span>
		</LinkContainer>
	);
};

export default EmailBox;
