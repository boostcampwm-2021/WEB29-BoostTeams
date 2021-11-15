import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { signUp } from '@apis/auth';
import SignUpTemplate from '@templates/SignUpTemplate';
import { getCookie } from '@utils/cookie';
import { emailRegExp, pwRegExp, nameRegExp } from '@utils/regexs';

const checkName = (name: string) => {
	if (name === '') {
		toast.warn('😮 이름을 입력해주세요!');
		return false;
	}
	if (!nameRegExp.test(name) || name.length > 20) {
		toast.warn('😮 올바르지 않은 이름입니다!');
		return false;
	}
	return true;
};

const checkEmail = (email: string) => {
	if (email === '') {
		toast.warn('😮 이메일을 입력해주세요!');
		return false;
	}
	if (!emailRegExp.test(email)) {
		toast.warn('😮 올바르지 않은 이메일 형식입니다!');
		return false;
	}
	return true;
};

const checkPW = (pw: string) => {
	if (pw === '') {
		toast.warn('😮 비밀번호를 입력해주세요!');
		return false;
	}
	if (!pwRegExp.test(pw) || pw.length > 15) {
		toast.warn('😮 올바르지 않은 비밀번호입니다!');
		return false;
	}
	return true;
};

const SignUpPage: React.FC = () => {
	const history = useHistory();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');
	const signUpHandler = () => {
		if (checkName(name) && checkEmail(email) && checkPW(pw)) {
			signUp({ userName: name, userEmail: email, userPassword: pw }, () => {
				localStorage.setItem('JWT', getCookie('JWT'));
				toast.success('😎 회원가입 성공');
				history.push('/team');
			});
		}
	};
	const inputNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const inputEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const inputPwHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPw(e.target.value);
	};
	return (
		<SignUpTemplate
			signUpHandler={signUpHandler}
			inputNameHandler={inputNameHandler}
			inputEmailHandler={inputEmailHandler}
			inputPwHandler={inputPwHandler}
		/>
	);
};

export default SignUpPage;
