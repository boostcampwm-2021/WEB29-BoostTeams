import React from 'react';

import { CardData } from '@components/Team/type';
import { Header } from '@components/common';
import { MyTeamList, InviteList, CreateTeamModal } from '@components/Team';
import { Layout } from './style';

type Props = {
	showCreateTeamModal: boolean;
	myTeamList: CardData[];
	inviteList: CardData[];
	handleModalOpen: () => void;
	handleModalClose: () => void;
};

const TeamTemplate: React.FC<Props> = ({
	showCreateTeamModal,
	myTeamList,
	inviteList,
	handleModalOpen,
	handleModalClose,
}) => {
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
