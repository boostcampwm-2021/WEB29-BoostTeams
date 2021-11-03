import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import CalendarPage from '../pages/CalendarPage';

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={LoginPage} />
				<Route path='/chat' component={ChatPage} />
				<Route path='/calendar' component={CalendarPage} />
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
