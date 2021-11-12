import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { useRecoilState } from 'recoil';
import { check } from '../apis/auth';
import UserState from '../stores/user';
import { removeCookie } from '../utils/cookie';
import { SocketContext } from '../utils/socketContext';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
	const [user, setUser] = useRecoilState(UserState);
	const socket = useContext(SocketContext);
	useLayoutEffect(() => {
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
	});
	useEffect(() => {
		if (true) {
			socket.emit('check team join', { teamId: 1, userId: user.email });
			socket.on('check team join result', (res: any) => {
				if (res.result === ' true') {
					console.log(true);
				} else {
					socket.emit('join team', { teamId: 1, userId: res.userId });
				}
			});
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
