import React from 'react';

import { Meta, Story } from '@storybook/react';
import { ColorCode } from '@utils/constants';
import Button, { Props } from './index';

export default {
	title: 'common/Button',
	component: Button,
} as Meta;

const Template: Story<Props> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	text: '전송',
	backgroundColor: ColorCode.PRIMARY1,
	fontColor: ColorCode.WHITE,
};

export const Secondary = Template.bind({});
Secondary.args = {
	text: '닫기',
	backgroundColor: ColorCode.WHITE,
	fontColor: ColorCode.BLACK,
};
