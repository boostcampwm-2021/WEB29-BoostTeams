const baseUrl = process.env.REACT_APP_SERVER ?? 'http://localhost:4000';

const header: HeadersInit = {
	'Content-Type': 'application/json',
	authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
};

const getHeader = () => {
	header.authorization = `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`;
	return header;
};

const getRefreshHeader = () => {
	header.authorization = `Bearer ${localStorage.getItem('REFRESH_TOKEN')}`;
	return header;
};

type RequestData = { [key: string]: string | number | any[] };

const fetchApi = {
	get: (path: string): Promise<Response> =>
		fetch(`${baseUrl}${path}`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: getHeader(),
		}),

	post: (path: string, data: RequestData): Promise<Response> =>
		fetch(`${baseUrl}${path}`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: getHeader(),
			body: JSON.stringify(data),
		}),

	put: (path: string, data: RequestData): Promise<Response> =>
		fetch(`${baseUrl}${path}`, {
			method: 'PUT',
			mode: 'cors',
			credentials: 'include',
			headers: getHeader(),
			body: JSON.stringify(data),
		}),

	patch: (path: string, data: RequestData): Promise<Response> =>
		fetch(`${baseUrl}${path}`, {
			method: 'PATCH',
			mode: 'cors',
			credentials: 'include',
			headers: getHeader(),
			body: JSON.stringify(data),
		}),

	delete: (path: string, data?: RequestData): Promise<Response> =>
		fetch(`${baseUrl}${path}`, {
			method: 'DELETE',
			mode: 'cors',
			credentials: 'include',
			headers: getHeader(),
			body: JSON.stringify(data),
		}),

	updateToken: () =>
		fetch(`${baseUrl}${'/api/auth/refresh-token'}`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: getRefreshHeader(),
		}),
};

export default fetchApi;
