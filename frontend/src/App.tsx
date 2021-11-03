import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Chat from './pages/ChatPage';
import Calendar from './pages/CalendarPage';

const App: React.FC = () => {
	useEffect(() => {
		const socket = socketIOClient('http://localhost:4000');
		socket.connect();
	}, []);

	return (
		<div className="App">
			<Calendar />
		</div>
	);
};

export default App;
