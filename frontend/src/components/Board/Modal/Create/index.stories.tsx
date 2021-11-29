import React from 'react';

import { Meta, Story } from '@storybook/react';
import CreatePostitModal, { Props } from './index';
import { MPostit, MSocketApi } from './mock';

export default {
	title: 'Modals/Postit',
	component: CreatePostitModal,
} as Meta;

const Template: Story<Props> = (args) => <CreatePostitModal {...args} />;

export const CreatePostit = Template.bind({});
export const UpdatePostit = Template.bind({});

CreatePostit.args = {
	socketApi: MSocketApi,
	handleModalClose: () => null,
	modalType: 'create',
	clickedPostit: undefined,
};

UpdatePostit.args = {
	socketApi: MSocketApi,
	handleModalClose: () => null,
	modalType: 'update',
	clickedPostit: MPostit,
};
