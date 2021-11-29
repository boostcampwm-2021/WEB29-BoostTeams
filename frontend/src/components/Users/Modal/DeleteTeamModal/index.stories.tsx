import React from 'react';

import { Meta, Story } from '@storybook/react';
import DeleteTeamModal, { Props } from './index';

export default {
	title: 'Modals/Team',
	component: DeleteTeamModal,
} as Meta;

const Template: Story<Props> = (args) => <DeleteTeamModal {...args} />;

export const DeleteTeam = Template.bind({});

DeleteTeam.args = {
	handleModalClose: () => null,
	teamId: 0,
};
