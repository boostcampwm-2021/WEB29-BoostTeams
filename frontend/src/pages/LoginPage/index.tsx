import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import LoginTemplate from '@templates/LoginTemplate';
import { getCookie } from '@utils/cookie';
import { login } from '@apis/auth';

const LoginPage: React.FC = () => {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');
	const inputEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const inputPwHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPw(e.target.value);
	};
	const localLoginHandler = () => {
		login({ userEmail: email, userPassword: pw }, () => {
			if (getCookie('ACCESS_TOKEN') && getCookie('ACCESS_TOKEN') !== undefined) {
				localStorage.setItem('ACCESS_TOKEN', getCookie('ACCESS_TOKEN'));
				localStorage.setItem('REFRESH_TOKEN', getCookie('REFRESH_TOKEN'));
				history.push('/team');
				toast.success('😃 로그인 성공');
			}
		});
	};
	useEffect(() => {
		if (getCookie('ACCESS_TOKEN') && getCookie('ACCESS_TOKEN') !== undefined) {
			localStorage.setItem('ACCESS_TOKEN', getCookie('ACCESS_TOKEN'));
			localStorage.setItem('REFRESH_TOKEN', getCookie('REFRESH_TOKEN'));
			history.push('/team');
			toast.success('😎 Github 로그인 성공');
		}
	}, []);
	return (
		<LoginTemplate
			localLoginHandler={localLoginHandler}
			inputEmailHandler={inputEmailHandler}
			inputPwHandler={inputPwHandler}
		/>
	);
};

export default LoginPage;
