import React from 'react';

import { Meta, Story } from '@storybook/react';
import ExitTeamModal, { Props } from './index';

export default {
	title: 'Modals/Team',
	component: ExitTeamModal,
} as Meta;

const Template: Story<Props> = (args) => <ExitTeamModal {...args} />;

export const ExitTeam = Template.bind({});

ExitTeam.args = {
	handleModalClose: () => null,
	teamId: 0,
};
