import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={LoginPage} />
				<Route exact path="/chat" component={ChatPage} />
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
