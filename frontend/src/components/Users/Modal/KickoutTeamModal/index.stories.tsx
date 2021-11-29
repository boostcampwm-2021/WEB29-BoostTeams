import React from 'react';

import { Meta, Story } from '@storybook/react';
import KickoutTeamModal, { Props } from './index';

export default {
	title: 'common/Modal/Team',
	component: KickoutTeamModal,
} as Meta;

const Template: Story<Props> = (args) => <KickoutTeamModal {...args} />;

export const KickoutTeam = Template.bind({});

KickoutTeam.args = {
	handleModalClose: () => {
		console.log('닫기');
	},
	teamId: 0,
};
