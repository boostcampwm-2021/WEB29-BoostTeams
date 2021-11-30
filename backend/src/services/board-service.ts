import Redis from '@redis/index';
import { IPostit } from '../customeTypes/board';

const redisClient = new Redis();

const BoardService = {
	getPostitList: async (teamId: string) => {
		return await redisClient.get(BOARD, teamId);
	},
	createPostit: async (postit: IPostit, teamId: string) => {
		const newPostit = await makePostitObj(postit);
		await redisClient.set(BOARD, teamId, newPostit);
		return newPostit;
	},
	deletePostit: async (teamId: string, postitId: number) => {
		return await redisClient.delete(BOARD, teamId, postitId);
	},
	updatePostit: async (teamId: string, newPostit: IPostit) => {
		const updatedPostit = await redisClient.set(BOARD, teamId, newPostit);
		return updatedPostit;
	}
};

const makePostitObj = async (newData: IPostit): Promise<IPostit> => {
	const id = Number(await Redis.getIndex());
	return {
		id: id,
		title: newData.title,
		content: newData.content,
		x: 0,
		y: 0,
		color: newData.color,
		updatedAt: new Date(),
		updatedBy: newData.updatedBy,
		createdAt: new Date(),
		createdBy: newData.createdBy,
		whoIsDragging: -1,
		whoIsUpdating: -1
	};
};

const BOARD = 'board';

export default BoardService;
