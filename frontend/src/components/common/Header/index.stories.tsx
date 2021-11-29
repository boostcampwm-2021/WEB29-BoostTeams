import React from 'react';

import { Meta, Story } from '@storybook/react';
import Header from './index';

export default {
	title: 'common/Header',
	component: Header,
} as Meta;

const Template: Story = () => <Header />;

export const Default = Template.bind({});
