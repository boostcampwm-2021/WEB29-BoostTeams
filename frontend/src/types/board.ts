import { KonvaEventObject } from 'konva/lib/Node';

export interface IPostit {
	id: number;
	x: number;
	y: number;
	title: string;
	content: string;
	color: number;
	createdBy: number;
	createdAt: string;
	updatedBy: number;
	updatedAt: string;
	whoIsDragging: number;
	whoIsUpdating: number;
}

export interface ISocketApi {
	createNewPostit: (newPostit: any) => void;
	updateStartPostit: (targetId: number) => void;
	updateEndPostit: (newPostit: any) => void;
	dragPostit: (e: KonvaEventObject<DragEvent>) => void;
	setUpdatedPostitList: (initPoistList: IPostit[]) => void;
	deletePostit: (targetId: number) => void;
	dragEndPostit: (e: KonvaEventObject<DragEvent>) => void;
	setUpdatedPostit: (newPostit: IPostit) => void;
}
