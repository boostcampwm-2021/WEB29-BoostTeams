import React, { Suspense } from 'react';

import { Header } from '../../components/common';
import { CardList } from '../../components/Team';

import { Layout } from './style';

const myTeam = [
	{ team_id: 0, team_name: 'team#1', team_desc: 'team_desc#1' },
	{ team_id: 1, team_name: 'team#2', team_desc: 'team_desc#2' },
	{ team_id: 2, team_name: 'team#3', team_desc: 'team_desc#3' },
];

const inviteTeam = [{ team_id: 3, team_name: 'team#4', team_desc: 'team_desc#4' }];

const Team: React.FC = () => {
	return (
		<Layout>
			<Header />
			<Suspense fallback={<div>loading</div>}>
				<CardList dummy={myTeam} type='myTeam' />
			</Suspense>
			<Suspense fallback={<div>loading</div>}>
				<CardList dummy={inviteTeam} type='invitation' />
			</Suspense>
		</Layout>
	);
};

export default Team;
