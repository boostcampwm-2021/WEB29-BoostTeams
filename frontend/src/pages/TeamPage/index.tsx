import React, { Suspense, useState } from 'react';
import TeamTemplate from '../../templates/TeamTemplate';
import LoadingPage from '../LoadingPage';

const TeamPage: React.FC = () => {
	const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
	const handleModalOpen = () => {
		setShowCreateTeamModal(true);
	};
	const handleModalClose = () => {
		setShowCreateTeamModal(false);
	};

	return (
		<Suspense fallback={<LoadingPage />}>
			<TeamTemplate
				showCreateTeamModal={showCreateTeamModal}
				handleModalOpen={handleModalOpen}
				handleModalClose={handleModalClose}
			/>
		</Suspense>
	);
};

export default TeamPage;
