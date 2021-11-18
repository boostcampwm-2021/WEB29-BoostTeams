import React from 'react';

import { Meta, Story } from '@storybook/react';
import ColorPicker, { Props } from './index';

export default {
	title: 'common/ColorPicker',
	component: ColorPicker,
} as Meta;

const Template: Story<Props> = (args) => <ColorPicker {...args} />;

export const Basic = Template.bind({});
Basic.args = {
	selectedColor: 0,
};
