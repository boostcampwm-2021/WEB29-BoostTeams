import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { check } from '@apis/auth';
import userState from '@stores/user';
import { getCookie, removeCookie } from '@utils/cookie';
import fetchApi from '@src/utils/fetch';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
	const setUser = useSetRecoilState(userState);
	const [loading, setLoading] = useState<boolean>(true);

	const resetToken = async () => {
		const res = await fetchApi.updateToken();
		localStorage.setItem('ACCESS_TOKEN', getCookie('ACCESS_TOKEN'));
		localStorage.setItem('REFRESH_TOKEN', getCookie('REFRESH_TOKEN'));
		checkUser();
		setLoading(false);
	};
	const checkUser = () =>
		check(
			(res: any) => {
				setUser({
					id: res.user_id,
					name: res.user_name,
					email: res.user_email,
					color: res.user_color,
					github_id: res.github_id,
					github_name: res.github_name,
				});

				setLoading(false);
			},
			() => {
				resetToken();
			},
		);
	useEffect(() => {
		if (localStorage.getItem('ACCESS_TOKEN')) {
			checkUser();
		} else {
			resetToken();
		}
	}, []);
	return loading ? (
		<></>
	) : (
		<Route
			{...rest}
			render={(props) => (localStorage.getItem('ACCESS_TOKEN') ? <Component {...props} /> : <Redirect to='/' />)}
		/>
	);
};

export default PrivateRoute;
