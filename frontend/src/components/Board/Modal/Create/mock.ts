import { IPostit, ISocketApi } from '@src/types/board';

export const MPostit: IPostit = {
	id: 0,
	x: 0,
	y: 0,
	title: 'Postit title',
	content: 'Postit content',
	color: 0,
	createdBy: 0,
	createdAt: Date.toString(),
	updatedBy: 0,
	updatedAt: Date.toString(),
	whoIsDragging: -1,
	whoIsUpdating: -1,
};

export const MSocketApi: ISocketApi = {
	createNewPostit: () => {
		console.log('포스트잇 생성');
	},
	updateEndPostit: () => {
		console.log('포스트잇 수정 완료');
	},
	updateStartPostit: () => {
		console.log('.');
	},
	dragPostit: () => {
		console.log('.');
	},
	setUpdatedPostitList: () => {
		console.log('.');
	},
	deletePostit: () => {
		console.log('.');
	},
	dragEndPostit: () => {
		console.log('.');
	},
	setUpdatedPostit: () => {
		console.log('.');
	},
};
