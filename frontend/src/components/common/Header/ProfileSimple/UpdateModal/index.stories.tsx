import React from 'react';

import { Meta, Story } from '@storybook/react';
import UpdateModal, { Props } from './index';

export default {
	title: 'common/Modal/User',
	component: UpdateModal,
} as Meta;

const Template: Story<Props> = (args) => <UpdateModal {...args} />;

export const Update = Template.bind({});

Update.args = {
	handleModalClose: () => {
		console.log('닫기');
	},
};
