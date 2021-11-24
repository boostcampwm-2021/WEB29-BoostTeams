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
}

export interface ISocketApi {
	createNewPostit: (newPostit: any) => void;
	updatePostit: (newPostit: any) => void;
	dragPostit: (e: KonvaEventObject<DragEvent>) => void;
}
