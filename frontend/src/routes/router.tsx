import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import CalendarPage from '../pages/CalendarPage';
import TeamPage from '../pages/TeamPage';
import { check } from '../apis/auth';
import UserState from '../stores/user';

const Router: React.FC = () => {
	const setUser = useSetRecoilState(UserState);

	check(
		(res: any) => {
			setUser({ name: res?.user_name, email: res?.user_email, state: res?.user_state, team_id: 1 });
		},
		() => {
			if (window.location.href !== 'http://localhost:3000/') window.location.href = '/';
		},
	);
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={LoginPage} />
				<Route path='/team' component={TeamPage} />
				<Route path='/chat' component={ChatPage} />
				<Route path='/calendar' component={CalendarPage} />
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
