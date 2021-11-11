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
				<PublicRoute exact path='/signup' component={SignUpPage} />
				<PrivateRoute exact path='/team' component={TeamPage} />
				<PrivateRoute exact path='/team/:teamId/chat' component={ChatPage} />
				<PrivateRoute exact path='/team/:teamId/calendar' component={CalendarPage} />
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
/* 
1. url에 유저 id 안 넣어도 됨? (안 넣어도 여전히 RESTful한 가?)

users/:user_id/teams/:team_id/calendar
users/:user_id/teams/:team_id/chats
users/:user_id/teams/:team_id/chats/:chat_id
*/
