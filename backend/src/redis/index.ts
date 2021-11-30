import { createClient, RedisClient } from 'redis';

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

	get(key: string, field: string) {
		return new Promise((resolve, reject) => {
			Redis.client.hget(key, field, async (searchError, searchResult) => {
				if (searchError) return reject(searchError);
				else if (searchResult === null) return resolve([]);
				else return resolve(JSON.parse(searchResult));
			});
		});
	}

	set(key: string, field: string, value: any) {
		return new Promise(async (resolve, reject) => {
			const storedDataList = await this.get(key, field);
			if (!storedDataList || !Array.isArray(storedDataList)) reject(false);
			else {
				const storedDataIndex = storedDataList.findIndex((data) => Number(data.id) === Number(value.id));
				// update
				if (storedDataIndex !== -1) {
					const updatedData = { ...storedDataList[storedDataIndex], ...value };
					storedDataList.splice(storedDataIndex, 1, updatedData);
					Redis.client.hset(key, field, JSON.stringify(storedDataList));
					return resolve(updatedData);
				}
				// create
				else {
					Redis.client.hset(key, field, JSON.stringify([...storedDataList, value]));
					await Redis.increaseIndex();
					return resolve(value);
				}
			}
		});
	}

	delete(key: string, field: string, targetId: number) {
		return new Promise((resolve, reject) => {
			Redis.client.hget(key, field, (err, searchResult) => {
				if (err) return reject(err);
				const storedDataList = JSON.parse(searchResult);
				const updatedDataList = storedDataList.filter((data) => Number(data.id) !== Number(targetId));
				Redis.client.hset(key, field, JSON.stringify(updatedDataList));
				return resolve(updatedDataList);
			});
		});
	}

	static getIndex() {
		return new Promise<number>((resolve) => {
			Redis.client.GET(INDEX, (err, index) => resolve(Number(index)));
		});
	}

	static async increaseIndex() {
		const lastIndex = await Redis.getIndex();
		return new Promise((resolve, reject) => {
			Redis.client.set(INDEX, String(lastIndex + 1), (error) => {
				if (error) return reject(error);
				else resolve(true);
			});
		});
	}
}

const INDEX = 'index';
