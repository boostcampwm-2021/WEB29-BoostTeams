import { toast } from 'react-toastify';
import fetchApi from '@utils/fetch';

export const updateName = async ({ newName }: { newName: string }, cb?: any) => {
	try {
		const res = await fetchApi.patch('/api/users', { newName });
		if (res.status === 201) {
			cb();
			toast.success('π λλ€μ λ³κ²½ μ±κ³΅');
		} else if (res.status === 401) {
			throw new Error('π£ μ μ  μ λ³΄λ₯Ό μ°Ύμ μ μμ΅λλ€!');
		} else if (res.status === 409) {
			throw new Error('π£ μ΄λ―Έ μ‘΄μ¬νλ μ΄λ¦μλλ€!');
		} else {
			throw new Error('π£ μλ²μμ μ°κ²°μ΄ μ¬μμΉ μμ΅λλ€!');
		}
	} catch (err) {
		toast.error((err as Error).message);
	}
};
