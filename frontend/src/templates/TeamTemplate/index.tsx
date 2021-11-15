import React from 'react';
import { useRecoilValue } from 'recoil';
import { userTeamList } from '@stores/team';

import { CardData } from '@components/Team/type';
import { Header } from '@components/common';
import { MyTeamList, InviteList, CreateTeamModal } from '@components/Team';
import { Layout } from './style';

type Props = {
	showCreateTeamModal: boolean;
	handleModalOpen: () => void;
	handleModalClose: () => void;
};

const TeamTemplate: React.FC<Props> = ({ showCreateTeamModal, handleModalOpen, handleModalClose }) => {
	const teamList = useRecoilValue(userTeamList);
	const myTeamList: CardData[] = [];
	const inviteList: CardData[] = [];
	teamList.reduce((pre: void, team: CardData) => {
		if (team.state) {
			myTeamList.push(team);
		} else {
			inviteList.push(team);
		}
		return pre;
	}, '');
	return (
		<Layout>
			<Header />
			<MyTeamList list={myTeamList} handleModalOpen={handleModalOpen} />
			<InviteList list={inviteList} />
			{showCreateTeamModal && <CreateTeamModal handleModalClose={handleModalClose} />}
		</Layout>
	);
};

export default TeamTemplate;
