const baseUrl = process.env.SERVER ?? 'http://localhost:4000';

const headers: HeadersInit = {
	'Content-Type': 'application/json',
	authorization: `Bearer ${localStorage.getItem('JWT')}`,
};

type RequestData = { [key: string]: string | number };

const fetchApi = {
	get: (path: string): Promise<Response> =>
		fetch(`${baseUrl}${path}`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers,
		}),

	post: (path: string, data: RequestData): Promise<Response> =>
		fetch(`${baseUrl}${path}`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers,
			body: JSON.stringify(data),
		}),
	put: (path: string, data: RequestData): Promise<Response> =>
		fetch(`${baseUrl}${path}`, {
			method: 'PUT',
			mode: 'cors',
			credentials: 'include',
			headers,
			body: JSON.stringify(data),
		}),

	delete: (path: string): Promise<Response> =>
		fetch(`${baseUrl}${path}`, {
			method: 'DELETE',
			mode: 'cors',
			credentials: 'include',
			headers,
		}),
};

export default fetchApi;
