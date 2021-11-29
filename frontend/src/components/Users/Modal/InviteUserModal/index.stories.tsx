import React from 'react';

import { Meta, Story } from '@storybook/react';
import InviteUserModal, { Props } from './index';

export default {
	title: 'common/Modal/Team',
	component: InviteUserModal,
} as Meta;

const Template: Story<Props> = (args) => <InviteUserModal {...args} />;

export const InviteUser = Template.bind({});

InviteUser.args = {
	handleModalClose: () => {
		console.log('닫기');
	},
	teamId: 0,
};
