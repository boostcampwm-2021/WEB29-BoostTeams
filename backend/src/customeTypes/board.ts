export interface IPostit {
	id: number;
	title?: string;
	content?: string;
	x?: number;
	y?: number;
	color?: number;
	updatedAt?: Date;
	updatedBy?: number;
	createdAt?: Date;
	createdBy?: number;
	whoIsDragging?: number;
	whoIsUpdating?: number;
}
