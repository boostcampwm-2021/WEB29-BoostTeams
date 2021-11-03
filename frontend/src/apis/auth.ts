import fetchApi from '../utils/fetch';

export const login = ({ userEmail, userPassword }: { userEmail: string; userPassword: string }) => {
	return fetchApi.post('/api/auth/login', { userEmail, userPassword });
};

export const githubLogin = () => {
	window.location.href = `${process.env.SERVER ?? 'http://localhost:4000'}/auth/github`;
};
