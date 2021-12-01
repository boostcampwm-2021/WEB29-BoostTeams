import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getCookie = (name: string) => {
	return cookies.get(name);
};

export const removeCookie = (name: string): void => {
	return cookies.remove(name);
};
