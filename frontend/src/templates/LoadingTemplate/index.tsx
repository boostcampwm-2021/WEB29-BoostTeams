import React from 'react';
import { Layout } from './style';

const LoadingTemplate: React.FC = () => {
	return (
		<Layout>
			<img src='/images/loading.gif' alt='loading' />
			<span>Loading...</span>
		</Layout>
	);
};

export default LoadingTemplate;
