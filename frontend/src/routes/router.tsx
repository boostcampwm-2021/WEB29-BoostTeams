import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LoginPage from '@pages/LoginPage';
import TeamPage from '@pages/TeamPage';
import SignUpPage from '@pages/SignUpPage';
import LoadingPage from '@pages/LoadingPage';
import ErrorPage from '@pages/ErrorPage';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import TeamRoute from './TeamRoute';

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<PublicRoute exact path='/' component={LoginPage} />
				<PublicRoute exact path='/signup' component={SignUpPage} />
				<PrivateRoute exact path='/team' component={TeamPage} />
				<TeamRoute path='/team/:teamId' />
				<Route exact path='/loading' component={LoadingPage} />
				<Route path='*' component={ErrorPage} />
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
