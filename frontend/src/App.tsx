import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import dotenv from 'dotenv';
import { RecoilRoot } from 'recoil';
import Router from './routes/router';

dotenv.config();

const App: React.FC = () => {
	useEffect(() => {
		const socket = socketIOClient('http://localhost:4000');
		socket.connect();
	}, []);

	return (
		<RecoilRoot>
			<Router />
		</RecoilRoot>
	);
};

export default App;
