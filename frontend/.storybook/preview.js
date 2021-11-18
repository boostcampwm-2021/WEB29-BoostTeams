import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import GlobalStyle from '../src/styles/global';
import LoadingPage from '../src/pages/LoadingPage';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <Suspense fallback={<LoadingPage />}>
      <GlobalStyle />
			<RecoilRoot>
				<Story />
			</RecoilRoot>
			<ToastContainer />
		</Suspense>
  ),
];
