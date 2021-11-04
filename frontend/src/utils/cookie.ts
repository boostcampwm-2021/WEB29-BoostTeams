import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getCookie: any = (name: string) => {
	return cookies.get(name);
};
