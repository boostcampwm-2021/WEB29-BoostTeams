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

export interface ICreatePostit {
	title: string;
	color: number;
	content: string;
	createdBy: number;
	updatedBy: number;
}

export interface IUpdatePostit {
	id?: number;
	x?: number;
	y?: number;
	title?: string;
	content?: string;
	color?: number;
	createdBy?: number;
	createdAt?: string;
	updatedBy?: number;
	updatedAt?: string;
	whoIsDragging?: number;
	whoIsUpdating?: number;
}
