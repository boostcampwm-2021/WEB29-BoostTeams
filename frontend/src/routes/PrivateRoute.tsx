import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import useCheckLogin from '@hooks/useCheckLogin';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
	const checkLogin = useCheckLogin();
	useEffect(() => {
		if (localStorage.getItem('JWT')) {
			checkLogin();
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
