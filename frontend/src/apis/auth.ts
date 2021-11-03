import bcrypt from 'bcryptjs';
import { SALT_OR_ROUND } from '../utils/constants';
import fetchApi from '../utils/fetch';

export const login = ({ userEmail, userPassword }: { userEmail: string; userPassword: string }) => {
	const encryptedPassword = bcrypt.hashSync(userPassword, SALT_OR_ROUND);
	return fetchApi.post('/api/auth/login', { userEmail, encryptedPassword });
};

export const githubLogin = () => {
	window.location.href = `${process.env.SERVER ?? 'http://localhost:4000'}/api/auth/github`;
};

export const check = () => {
	return fetchApi.get('/api/auth/info');
};
