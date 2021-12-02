import { createClient, RedisClient } from 'redis';
import { findTargetData } from './helper';
import { MessageType } from '@src/customeTypes/chat';
import { IPostit } from '@src/customeTypes/board';

const INDEX = 'index';
export default class Redis {
	static instance: Redis;
	static client: RedisClient;
	constructor() {
		if (Redis.instance) return Redis.instance;
		else {
			Redis.client = createClient({
				host: process.env.REDIS_HOST,
				port: Number(process.env.REDIS_PORT),
				password: process.env.REDIS_PASSWORD
			});
			Redis.instance = this;
			Redis.client.on('connect', () => console.log('Redis connect'));
			Redis.client.on('error', (error) => console.log(error));
		}
		return Redis.instance;
	}
	async read(key: string, field: string): Promise<IPostit[] | MessageType[] | []> {
		try {
			return await Redis.get(key, field);
		} catch (error) {
			return error;
		}
	}

	async create(key: string, field: string, value: IPostit | MessageType): Promise<boolean> {
		try {
			const storedDataList = (await Redis.get(key, field)) as any;
			storedDataList.push(value);
			await Redis.set(key, field, storedDataList);
			await Redis.increaseIndex();
			return true;
		} catch (error) {
			return false;
		}
	}

	async update(key: string, field: string, value: IPostit): Promise<IPostit> {
		try {
			const storedDataList = await Redis.get(key, field);
			const { targetData, targetDataIndex } = findTargetData(storedDataList, value.id);
			const updatedData = { ...targetData, ...value };
			storedDataList[targetDataIndex] = updatedData;
			await Redis.set(key, field, storedDataList);
			return updatedData;
		} catch (error) {
			return error;
		}
	}

	async delete(key: string, field: string, targetId: number): Promise<IPostit[] | MessageType[] | []> {
		try {
			const storedDataList = await Redis.get(key, field);
			const updatedDataList = storedDataList.filter((data: IPostit) => Number(data.id) !== Number(targetId));
			await Redis.set(key, field, updatedDataList);
			return updatedDataList;
		} catch (error) {
			return error;
		}
	}

	static get(key: string, field: string): Promise<IPostit[] | MessageType[] | []> {
		return new Promise((resolve, reject) => {
			Redis.client.hget(key, field, (error, searchResult) => {
				if (error) return reject(error);
				else if (searchResult === null) return resolve([]);
				else return resolve(JSON.parse(searchResult));
			});
		});
	}

	static set(key: string, field: string, value: IPostit[] | MessageType[]): Promise<Error | boolean> {
		return new Promise((resolve, reject) => {
			Redis.client.hset(key, field, JSON.stringify(value), (error) => {
				if (error) return reject(error);
				else return resolve(true);
			});
		});
	}

	static getIndex(): Promise<number> {
		return new Promise((resolve, reject) => {
			Redis.client.get(INDEX, (error, index) => {
				if (error) return reject(error);
				else resolve(Number(index));
			});
		});
	}

	static increaseIndex(): Promise<Error | boolean> {
		return new Promise(async (resolve, reject) => {
			const lastIndex = await Redis.getIndex();
			Redis.client.set(INDEX, String(lastIndex + 1), (error) => {
				if (error) return reject(error);
				else resolve(true);
			});
		});
	}
}
