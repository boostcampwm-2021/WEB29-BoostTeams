import React from 'react';

import { Meta, Story } from '@storybook/react';
import CreatePostitModal, { Props } from './index';
import { MPostit, MSocketApi } from './mock';

export default {
	title: 'common/Modal/Postit',
	component: CreatePostitModal,
} as Meta;

const Template: Story<Props> = (args) => <CreatePostitModal {...args} />;

export const CreatePostit = Template.bind({});
export const UpdatePostit = Template.bind({});

CreatePostit.args = {
	socketApi: MSocketApi,
	handleModalClose: () => {
		console.log('닫기');
	},
	modalType: 'create',
	clickedPostit: undefined,
};

UpdatePostit.args = {
	socketApi: MSocketApi,
	handleModalClose: () => {
		console.log('닫기');
	},
	modalType: 'update',
	clickedPostit: MPostit,
};
