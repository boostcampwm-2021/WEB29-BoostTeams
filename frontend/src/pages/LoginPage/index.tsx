import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import LoginTemplate from '../../templates/LoginTemplate';
import { getCookie } from '../../utils/cookie';

const LoginPage: React.FC = () => {
	const JWT = getCookie('JWT');
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');
	const inputEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const inputPwHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPw(e.target.value);
	};
	useEffect(() => {
		if (JWT) {
			localStorage.setItem('JWT', JWT);
			history.push('/team');
			toast.success('😎 Github 로그인 성공');
		}
	}, []);
	return <LoginTemplate inputEmailHandler={inputEmailHandler} inputPwHandler={inputPwHandler} email={email} pw={pw} />;
};

export default LoginPage;
