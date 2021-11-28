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
	read(key: string, arrayId: number, dataId = undefined) {
		return new Promise((resolve, reject) => {
			Redis.client.lrange(`${key}-${arrayId}`, 0, -1, (error, array) => {
				if (error) return reject(error);
				else {
					const parsedArray = array.map((data) => JSON.parse(data));
					if (dataId) return resolve(parsedArray.find((data) => Number(data.id) === Number(dataId)));
					else return resolve(parsedArray);
				}
			});
		});
	}

	readLast(key: string, arrayId: number) {
		return new Promise((resolve, reject) => {
			Redis.client.rpop(`${key}-${arrayId}`, (error, data) => {
				if (error) return reject(error);
				else {
					Redis.client.rpush(`${key}-${arrayId}`, data, () => {
						return resolve(JSON.parse(data));
					});
				}
			});
		});
	}

	create(key: string, arrayId: number, data: any) {
		return new Promise(async (resolve, reject) => {
			await Redis.increaseIndex();
			Redis.client.rpush(`${key}-${arrayId}`, JSON.stringify(data), (error) => {
				if (error) return reject(error);
				else return resolve(true);
			});
		});
	}

	update(key: string, arrayId: number, newData: any) {
		return new Promise(async (resolve, reject) => {
			const dataArray = await this.read(key, arrayId);
			if (!dataArray || !Array.isArray(dataArray)) return reject(dataArray);
			const targetData = dataArray.find((data) => Number(data.id) === Number(newData.id));
			const updatedData = { ...targetData, ...newData };
			await this.remove(key, arrayId, newData.id);
			await this.create(key, arrayId, updatedData);
			console.log(1, updatedData);
			return resolve(updatedData);
		});
	}

	remove(key: string, arrayId: number, dataId = undefined) {
		return new Promise(async (resolve, reject) => {
			const targetData = await this.read(key, arrayId, dataId);
			Redis.client.lrem(`${key}-${arrayId}`, 1, JSON.stringify(targetData), (error, reply) => {
				if (error) return reject(error);
				else return resolve(reply);
			});
		});
	}

	static getIndex() {
		return new Promise((resolve, reject) => {
			Redis.client.get('index', (error, index) => {
				if (error) return reject(error);
				else return resolve(index);
			});
		});
	}

	static increaseIndex() {
		return new Promise((resolve, reject) => {
			Redis.client.get('index', (error, index) => {
				if (error) return reject(error);
				else {
					Redis.client.set('index', String(Number(index) + 1), (error) => {
						if (error) return reject(error);
						else return resolve(true);
					});
				}
			});
		});
	}
}
/* 
get(key: string, field: string) {
		return new Promise((resolve, reject) => {
			Redis.client.hget(key, field, async (err, searchResult) => {
				if (err) return reject(err);
				if (searchResult === null) {
					Redis.client.hset(key, field, JSON.stringify([]));
					const previousIndex = await Redis.getNextId(key);
					if (!previousIndex) Redis.client.hset(key, 'nextId', '0');
					return resolve([]);
				} else {
					return resolve(JSON.parse(searchResult));
				}
			});
		});
	}

	set(key: string, field: string, value: any) {
		return new Promise((resolve, reject) => {
			Redis.client.hget(key, field, async (err, searchResult) => {
				if (err) return reject(err);
				if (searchResult === null) {
					Redis.client.hset(key, field, JSON.stringify([value]));
					return resolve(value);
				}

				const storedDataList = JSON.parse(searchResult);
				const oldDataIdx = storedDataList.findIndex((data) => Number(data.id) === Number(value.id));
				// update
				if (oldDataIdx !== -1) {
					const updatedData = { ...storedDataList[oldDataIdx], ...value };
					storedDataList.splice(oldDataIdx, 1, updatedData);
					Redis.client.hset(key, field, JSON.stringify(storedDataList));
					return resolve(updatedData);
				}
				// create
				else {
					Redis.client.hset(key, field, JSON.stringify([...storedDataList, value]));
					await Redis.setNextId(key);
					return resolve(value);
				}
			});
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

	static getNextId(key: string, field = 'nextId') {
		return new Promise<number>((resolve) => {
			Redis.client.hget(key, field, (err, nextId) => resolve(Number(nextId)));
		});
	}

	static async setNextId(key: string, field = 'nextId') {
		const presentId = await Redis.getNextId(key);
		return new Promise((resolve) => {
			Redis.client.hset(key, field, String(presentId + 1));
			return resolve(null);
		});
	}
*/
