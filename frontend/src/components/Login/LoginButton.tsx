import React from 'react';
import { Button } from './style';

type Props = {
	localLoginHandler: () => void;
};

const LoginButton: React.FC<Props> = ({ localLoginHandler }) => {
	return (
		<Button onClick={localLoginHandler}>
			<span>Login</span>
		</Button>
	);
};

export default LoginButton;
