import React, { Suspense, useState } from 'react';
import TeamTemplate from '../../templates/TeamTemplate';

const TeamPage: React.FC = () => {
	const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
	const handleModalOpen = () => {
		setShowCreateTeamModal(true);
	};
	const handleModalClose = () => {
		setShowCreateTeamModal(false);
	};

	return (
		<Suspense fallback={<div>loading</div>}>
			<TeamTemplate
				showCreateTeamModal={showCreateTeamModal}
				handleModalOpen={handleModalOpen}
				handleModalClose={handleModalClose}
			/>
		</Suspense>
	);
};

export default TeamPage;
