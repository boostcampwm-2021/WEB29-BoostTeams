import React from 'react';
import LoadingImg from '@images/loading.gif';
import { Layout } from './style';

const LoadingTemplate: React.FC = () => {
	return (
		<Layout>
			<img src={LoadingImg} alt='loading' />
			<span>Loading...</span>
		</Layout>
	);
};

export default LoadingTemplate;
