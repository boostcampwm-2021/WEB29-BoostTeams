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
			if (!dataArray || !Array.isArray(dataArray)) return reject(new Error());
			const targetData = dataArray.find((data) => Number(data.id) === Number(newData.id));
			const updatedData = { ...targetData, ...newData };
			try {
				await this.create(key, arrayId, updatedData);
				await this.remove(key, arrayId, newData.id);
				return resolve(updatedData);
			} catch (err) {
				return reject(err);
			}
		});
	}

	remove(key: string, arrayId: number, dataId = undefined) {
		return new Promise(async (resolve, reject) => {
			const targetData = await this.read(key, arrayId, dataId);
			Redis.client.lrem(`${key}-${arrayId}`, 1, JSON.stringify(targetData), async (removeError) => {
				if (removeError) return reject(removeError);
				else {
					const updatedList = await this.read(key, arrayId);
					if (updatedList) return resolve(updatedList);
					else return reject(removeError);
				}
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
