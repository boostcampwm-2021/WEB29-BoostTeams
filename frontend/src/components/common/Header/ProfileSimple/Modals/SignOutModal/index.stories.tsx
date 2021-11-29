import React from 'react';

import { Meta, Story } from '@storybook/react';
import SignOutModal, { Props } from './index';

export default {
	title: 'Modals/User',
	component: SignOutModal,
} as Meta;

const Template: Story<Props> = (args) => <SignOutModal {...args} />;

export const SignOut = Template.bind({});

SignOut.args = {
	handleModalClose: () => null,
};
