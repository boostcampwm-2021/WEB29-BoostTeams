import React from 'react';
import { Meta, Story } from '@storybook/react';

import { MODAL_THEME } from '@utils/constants';

import Modal, { Props } from './index';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.querySelector('body')!.appendChild(modalRoot);

export default {
	title: 'common/Modal',
	component: Modal,
} as Meta;

const Template: Story<Props> = (args) => <Modal {...args} />;

export const Form = Template.bind({});
export const Notification = Template.bind({});
Form.args = {
	theme: MODAL_THEME.FORM,
	children: <span>modal children</span>,
	handleModalClose: () => null,
	handleSubmit: () => null,
	removeSubmitButton: false,
	submitBtnName: '저장',
	closeBtnName: '닫기',
};

Notification.args = {
	theme: MODAL_THEME.NOTIFICATION,
	children: <span>modal children</span>,
	handleModalClose: () => null,
	handleSubmit: () => null,
	removeSubmitButton: false,
	submitBtnName: '저장',
	closeBtnName: '닫기',
};
