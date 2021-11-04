import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import LoginTemplate from '../../templates/LoginTemplate';
import { check } from '../../apis/auth';
import { getCookie } from '../../utils/cookie';
import UserState from '../../stores/user';

const LoginPage: React.FC = () => {
	const JWT = getCookie('JWT');
	const history = useHistory();
	const setUser = useSetRecoilState(UserState);
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
		} else if (localStorage.getItem('JWT')) {
			check((res: any) => {
				setUser({ name: res?.user_name, email: res?.user_email, state: res.user_state, team_id: 1 });
				history.push('/team');
				toast.success('😎 자동 로그인 성공');
			});
		}
	}, []);

	return <LoginTemplate inputEmailHandler={inputEmailHandler} inputPwHandler={inputPwHandler} email={email} pw={pw} />;
};

export default LoginPage;
