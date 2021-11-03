const baseUrl = process.env.SERVER ?? 'http://localhost:4000';

const headers: HeadersInit = new Headers();

type RequestData = { [key: string]: string | number };

export const setHeader = (JWT: string) => {
	headers.set('Content-Type', 'application/json');
	if (JWT) headers.set('Authorization', `Bearer ${JWT}`);
};

const fetchApi = {
	get: (path: string): Promise<JSON> =>
		fetch(`${baseUrl}${path}`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers,
		}).then((res) => res.json()),

	post: (path: string, data: RequestData): Promise<JSON> =>
		fetch(`${baseUrl}${path}`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers,
			body: JSON.stringify(data),
		}).then((res) => res.json()),

	put: (path: string, data: RequestData): Promise<JSON> =>
		fetch(`${baseUrl}${path}`, {
			method: 'PUT',
			mode: 'cors',
			credentials: 'include',
			headers,
			body: JSON.stringify(data),
		}).then((res) => res.json()),

	delete: (path: string): Promise<JSON> =>
		fetch(`${baseUrl}${path}`, {
			method: 'DELETE',
			mode: 'cors',
			credentials: 'include',
			headers,
		}).then((res) => res.json()),
};

export default fetchApi;
