import AES from 'crypto-js/aes';
import { toast } from 'react-toastify';
import fetchApi from '../utils/fetch';

/**
 * @param cb: 로그인 확인 성공시 콜백 함수
 * @param err: 로그인 확인 실패시 콜백 함수
 */
export const login = async (
	{ userEmail, userPassword }: { userEmail: string; userPassword: string },
	cb?: any,
	err?: any,
) => {
	const key = process.env.REACT_APP_AES_KEY || 'key';
	const encryptedPassword = AES.encrypt(userPassword, key).toString();
	try {
		const res = await fetchApi.post('/api/auth/login', { userEmail, encryptedPassword });
		const data = await res.json();
		if (res.status === 200) {
			cb(data);
		}
		if (res.status === 401) {
			toast.error('😣 존재하지 않는 계정입니다!');
			err();
		}
	} catch (err) {
		toast.error('😣 서버와의 연결이 심상치 않습니다!');
	}
};

export const githubLogin = () => {
	window.location.href = `${process.env.REACT_APP_SERVER ?? 'http://localhost:4000'}/api/auth/github`;
};

/**
 * @param cb: 로그인 확인 성공시 콜백 함수
 * @param err: 로그인 확인 실패시 콜백 함수
 */
export const check = async (cb?: any, err?: any) => {
	try {
		const res = await fetchApi.get('/api/auth/info');
		const data = await res.json();
		if (res.status === 200) {
			cb(data);
		}
		if (res.status === 401) {
			err();
		}
	} catch (err) {
		toast.error('😣 서버와의 연결이 심상치 않습니다!');
	}
};

export const signUp = async (
	{ userName, userEmail, userPassword }: { userName: string; userEmail: string; userPassword: string },
	cb?: any,
) => {
	const key = process.env.REACT_APP_AES_KEY || 'key';
	const encryptedPassword = AES.encrypt(userPassword, key).toString();
	try {
		const res = await fetchApi.post('/api/auth/signup', { userName, userEmail, encryptedPassword });
		const data = await res.json();
		if (res.status === 201) {
			cb();
		}
		if (res.status === 409 && data.conflict === 'email') {
			toast.warn('😣 이미 존재하는 계정입니다!');
		}
		if (res.status === 409 && data.conflict === 'name') {
			toast.warn('😣 이미 존재하는 이름입니다!');
		}
	} catch (err) {
		toast.error('😣 서버와의 연결이 심상치 않습니다!');
	}
};
