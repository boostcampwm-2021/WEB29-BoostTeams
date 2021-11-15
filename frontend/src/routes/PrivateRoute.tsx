import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { check } from '@apis/auth';
import UserState from '@stores/user';
import { removeCookie } from '@utils/cookie';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
	const setUser = useSetRecoilState(UserState);
	useEffect(() => {
		if (localStorage.getItem('JWT')) {
			check(
				(res: any) => {
					setUser({
						name: res.user_name,
						email: res.user_email,
						state: res.user_state,
						team_id: 1,
						github: res.github_name,
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
