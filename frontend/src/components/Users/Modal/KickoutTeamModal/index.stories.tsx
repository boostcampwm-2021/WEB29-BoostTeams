import React from 'react';

import { Meta, Story } from '@storybook/react';
import KickoutTeamModal, { Props } from './index';

export default {
	title: 'Modals/Team',
	component: KickoutTeamModal,
} as Meta;

const Template: Story<Props> = (args) => <KickoutTeamModal {...args} />;

export const KickoutTeam = Template.bind({});

KickoutTeam.args = {
	handleModalClose: () => null,
	teamId: 0,
};
