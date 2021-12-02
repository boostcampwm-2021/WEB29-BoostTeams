import { createClient, RedisClient } from 'redis';
import { findTargetData } from './helper';
import { MessageType } from '@src/customeTypes/chat';
import { IPostit } from '@src/customeTypes/board';
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

	get(key: string, field: string): Promise<IPostit[] | MessageType[] | []> {
		return new Promise((resolve, reject) => {
			Redis.client.hget(key, field, (searchError, searchResult) => {
				if (searchError) return reject(searchError);
				else if (searchResult === null) return resolve([]);
				else return resolve(JSON.parse(searchResult));
			});
		});
	}

	create(key: string, field: string, value: IPostit | MessageType): Promise<IPostit | MessageType> {
		return new Promise(async (resolve, reject) => {
			const storedDataList = (await this.get(key, field)) as any;
			storedDataList.push(value);
			Redis.client.hset(key, field, JSON.stringify(storedDataList), (error) => {
				if (error) return reject(error);
				else {
					Redis.increaseIndex();
					return resolve(value);
				}
			});
		});
	}

	update(key: string, field: string, value: IPostit): Promise<IPostit> {
		return new Promise(async (resolve, reject) => {
			const storedDataList = await this.get(key, field);
			const { targetData, targetDataIndex } = findTargetData(storedDataList, value.id);
			const updatedData = { ...targetData, ...value };
			storedDataList[targetDataIndex] = updatedData;
			Redis.client.hset(key, field, JSON.stringify(storedDataList), (error) => {
				if (error) return reject(error);
				else return resolve(updatedData);
			});
		});
	}

	delete(key: string, field: string, targetId: number): Promise<IPostit[] | MessageType[] | []> {
		return new Promise(async (resolve, reject) => {
			const storedDataList = await this.get(key, field);
			const updatedDataList = storedDataList.filter((data: IPostit) => Number(data.id) !== Number(targetId));
			Redis.client.hset(key, field, JSON.stringify(updatedDataList), (error) => {
				if (error) return reject(error);
				else return resolve(updatedDataList);
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

const INDEX = 'index';
