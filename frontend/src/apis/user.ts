import { toast } from 'react-toastify';
import fetchApi from '@utils/fetch';

export const updateName = async ({ newName }: { newName: string }, cb?: any) => {
	try {
		const res = await fetchApi.patch('/api/users', { newName });
		if (res.status === 201) {
			cb();
			toast.success('😎 닉네임 변경 성공');
		} else if (res.status === 401) {
			throw new Error('😣 유저 정보를 찾을 수 없습니다!');
		} else if (res.status === 409) {
			throw new Error('😣 이미 존재하는 이름입니다!');
		} else {
			throw new Error('😣 서버와의 연결이 심상치 않습니다!');
		}
	} catch (err) {
		toast.error((err as Error).message);
	}
};
