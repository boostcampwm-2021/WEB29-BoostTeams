import Redis from '@redis/index';
import { IPostit } from '../customeTypes/board';

const redisClient = new Redis();

const NOBODY = -1;

const BoardService = {
	getPostitList: async (teamId: string) => {
		return await redisClient.read(BOARD, teamId);
	},
	createPostit: async (postit: IPostit, teamId: string) => {
		const newPostit = await makePostitObj(postit);
		await redisClient.create(BOARD, teamId, newPostit);
		return newPostit;
	},
	deletePostit: async (teamId: string, postitId: number) => {
		return await redisClient.delete(BOARD, teamId, postitId);
	},
	updatePostit: async (teamId: string, newPostit: IPostit) => {
		const updatedPostit = await redisClient.update(BOARD, teamId, newPostit);
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
		whoIsDragging: NOBODY,
		whoIsUpdating: NOBODY
	};
};

const BOARD = 'board';

export default BoardService;
