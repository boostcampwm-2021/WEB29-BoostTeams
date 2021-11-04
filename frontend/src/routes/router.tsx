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
