import React, { Suspense } from 'react';

import { Header } from '../../components/common';
import { CardList } from '../../components/Team';
import { Layout } from './style';

const TeamTemplate: React.FC = () => {
	return (
		<Layout>
			<Header />
			<Suspense fallback={<div>loading</div>}>
				<CardList type='myTeam' />
			</Suspense>
			<Suspense fallback={<div>loading</div>}>
				<CardList type='invitation' />
			</Suspense>
		</Layout>
	);
};

export default TeamTemplate;
