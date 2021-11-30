import React from 'react';

import { Meta, Story } from '@storybook/react';
import Sidebar from './index';

export default {
	title: 'common/Sidebar',
	component: Sidebar,
} as Meta;

const Template: Story = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});

Default.args = {
	children: <span>children</span>,
};
