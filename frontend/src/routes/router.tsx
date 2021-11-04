import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import CalendarPage from '../pages/CalendarPage';
import TeamPage from '../pages/TeamPage';
import SignUpPage from '../pages/SignUpPage';

const Router: React.FC = () => {
	const setUser = useSetRecoilState(UserState);
	check(
		(res: any) => {
			setUser({ name: res?.user_name, email: res?.user_email, state: res?.user_state});
		},
		() => {
			if (window.location.href !== 'http://localhost:3000/') window.location.href = '/';
		},
	);
	return (
		<BrowserRouter>
			<Switch>
				<PublicRoute exact path='/' component={LoginPage} />
				<PublicRoute path='/signup' component={SignUpPage} />
				<PrivateRoute path='/team' component={TeamPage} />
				<PrivateRoute path='/chat' component={ChatPage} />
				<PrivateRoute path='/calendar' component={CalendarPage} />
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
