import React, { useState } from 'react';
import TeamTemplate from '@templates/TeamTemplate';

const TeamPage: React.FC = () => {
	const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
	const handleModalOpen = () => {
		setShowCreateTeamModal(true);
	};
	const handleModalClose = () => {
		setShowCreateTeamModal(false);
	};

	return (
		<TeamTemplate
			showCreateTeamModal={showCreateTeamModal}
			handleModalOpen={handleModalOpen}
			handleModalClose={handleModalClose}
		/>
	);
};

export default TeamPage;
