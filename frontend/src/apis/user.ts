import { toast } from 'react-toastify';
import fetchApi from '@utils/fetch';

export const updateName = async ({ newName }: { newName: string }, cb?: any) => {
	try {
		const res = await fetchApi.patch('/api/user/name', { newName });
		if (res.status === 204) {
			cb();
			toast.success('😎 닉네임 변경 성공');
		}
		if (res.status === 401) {
			toast.warn('😣 유저 정보를 찾을 수 없습니다!');
		}
		if (res.status === 409) {
			toast.warn('😣 이미 존재하는 이름입니다!');
		}
	} catch (err) {
		toast.error('😣 서버와의 연결이 심상치 않습니다!');
	}
};
