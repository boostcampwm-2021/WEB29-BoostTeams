import React from 'react';

import { Meta, Story } from '@storybook/react';
import UpdateModal, { Props } from './index';

export default {
	title: 'Modals/User',
	component: UpdateModal,
} as Meta;

const Template: Story<Props> = (args) => <UpdateModal {...args} />;

export const Update = Template.bind({});

Update.args = {
	handleModalClose: () => null,
};
