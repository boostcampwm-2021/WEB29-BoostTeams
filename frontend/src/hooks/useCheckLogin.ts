import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import userState from '@stores/user';
import fetchApi from '@utils/fetch';
import useLogout from './useLogout';

const useCheckLogin = () => {
	const setUser = useSetRecoilState(userState);
	const logout = useLogout();
	const checkLogin = async () => {
		try {
			const res = await fetchApi.get('/api/auth/info');
			const data = await res.json();
			if (res.status === 200) {
				setUser({
					id: data.user_id,
					name: data.user_name,
					email: data.user_email,
					color: data.user_color,
					github_id: data.github_id,
					github_name: data.github_name,
				});
			}
			if (res.status === 401) {
				toast.error('😣 서버와의 연결이 심상치 않습니다!');
				logout();
			}
		} catch (err) {
			toast.error('😣 서버와의 연결이 심상치 않습니다!');
			logout();
		}
	};

	return () => {
		checkLogin();
	};
};

export default useCheckLogin;
