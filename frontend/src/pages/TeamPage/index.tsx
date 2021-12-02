import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import TeamTemplate from '@templates/TeamTemplate';
import { CardData } from '@components/Team/type';
import { userTeamList } from '@stores/team';

const TeamPage: React.FC = () => {
	const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
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

	const handleModalOpen = () => {
		setShowCreateTeamModal(true);
	};

	const handleModalClose = () => {
		setShowCreateTeamModal(false);
	};

	return (
		<TeamTemplate
			showCreateTeamModal={showCreateTeamModal}
			myTeamList={myTeamList}
			inviteList={inviteList}
			handleModalOpen={handleModalOpen}
			handleModalClose={handleModalClose}
		/>
	);
};

export default TeamPage;
