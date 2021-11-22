import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { check } from '@apis/auth';
import userState from '@stores/user';
import { removeCookie } from '@utils/cookie';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
	const setUser = useSetRecoilState(userState);
	useEffect(() => {
		if (localStorage.getItem('JWT')) {
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
				},
				() => {
					localStorage.removeItem('JWT');
					removeCookie('JWT', '');
				},
			);
		}
	}, []);
	return (
		<Route
			{...rest}
			render={(props) => (localStorage.getItem('JWT') ? <Component {...props} /> : <Redirect to='/' />)}
		/>
	);
};

export default PrivateRoute;
