import React, { Suspense, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import dotenv from 'dotenv';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import Router from './routes/router';
import 'react-toastify/dist/ReactToastify.css';
import LoadingPage from './pages/LoadingPage';

dotenv.config();

const App: React.FC = () => {
	useEffect(() => {
		const socket = socketIOClient(process.env.REACT_APP_SERVER || 'http://localhost:4000');
		socket.connect();
	}, []);

	return (
		<Suspense fallback={<LoadingPage />}>
			<RecoilRoot>
				<Router />
			</RecoilRoot>
			<ToastContainer />
		</Suspense>
	);
};

export default App;
