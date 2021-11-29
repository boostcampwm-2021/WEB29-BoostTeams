import React from 'react';

import { Meta, Story } from '@storybook/react';
import Modal, { Props } from './index';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.querySelector('body')!.appendChild(modalRoot);

export default {
	title: 'common/Modal',
	component: Modal,
} as Meta;

const Template: Story<Props> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
Primary.args = {
	theme: 'primary',
	children: <span>modal children</span>,
	handleModalClose: () => null,
	handleSubmit: () => null,
	removeSubmitButton: false,
	submitBtnName: '저장',
	closeBtnName: '닫기',
};

Secondary.args = {
	theme: 'secondary',
	children: <span>modal children</span>,
	handleModalClose: () => null,
	handleSubmit: () => null,
	removeSubmitButton: false,
	submitBtnName: '저장',
	closeBtnName: '닫기',
};
