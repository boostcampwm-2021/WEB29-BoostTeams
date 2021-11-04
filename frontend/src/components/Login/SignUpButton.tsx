import React from 'react';
import { Button } from './style';

type Props = {
	onClick?: () => void;
};

const SignUpButton: React.FC<Props> = ({ onClick }) => {
	return (
		<Button onClick={onClick}>
			<span>Signup</span>
		</Button>
	);
};

SignUpButton.defaultProps = {
	onClick: () => null,
};

export default SignUpButton;
