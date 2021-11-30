import React from 'react';

import { Meta, Story } from '@storybook/react';
import UpdateTeamModal, { Props } from './index';

export default {
	title: 'Modals/Team',
	component: UpdateTeamModal,
} as Meta;

const Template: Story<Props> = (args) => <UpdateTeamModal {...args} />;

export const UpdateTeam = Template.bind({});

UpdateTeam.args = {
	handleModalClose: () => null,
	teamId: 0,
};
