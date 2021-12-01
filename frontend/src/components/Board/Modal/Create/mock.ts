import { IPostit } from '@src/types/board';
import { NOBODY } from '@utils/constants';

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
	whoIsDragging: NOBODY,
	whoIsUpdating: NOBODY,
};
