import React, { Suspense } from 'react';
import dotenv from 'dotenv';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import Router from '@routes/router';
import LoadingPage from '@pages/LoadingPage';
import '@styles/fonts.css';
import 'react-toastify/dist/ReactToastify.css';

dotenv.config();

const App: React.FC = () => {
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
