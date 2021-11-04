import React from 'react';
import { Redirect, Route } from 'react-router';

const PublicRoute = ({ component: Component, ...rest }: any) => {
	return (
		<Route
			{...rest}
			render={(props) => (localStorage.getItem('JWT') ? <Redirect to='/team' /> : <Component {...props} />)}
		/>
	);
};

export default PublicRoute;
