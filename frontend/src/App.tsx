import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import dotenv from 'dotenv';
import Router from './routes/router';

dotenv.config();

const App: React.FC = () => {
	useEffect(() => {
		const socket = socketIOClient('http://localhost:4000');
		socket.connect();
	}, []);

	return <Router />;
};

export default App;
