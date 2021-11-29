import React from 'react';

import { Meta, Story } from '@storybook/react';
import CreateTeamModal from './index';

export default {
	title: 'Modals/Team',
	component: CreateTeamModal,
} as Meta;

type Props = {
	handleModalClose: () => void;
};

const Template: Story<Props> = () => (
	<CreateTeamModal
		handleModalClose={() => {
			console.log('닫기');
		}}
	/>
);

export const CreateTeam = Template.bind({});
