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
	// key === 'board' || 'chat'
	// field === roomId || chatId
	async get(key: string, field: string) {
		return new Promise((resolve, reject) => {
			Redis.client.hget(key, field, (err, obj) => {
				if (err) reject(err);
				else resolve(obj);
			});
		});
	}

	async set(key: string, field: string, value: any) {
		return new Promise((resolve, reject) => {
			Redis.client.hget(key, field, (err, obj) => {
				if (err) reject(err);
				else {
					const updatedValue = [...JSON.parse(obj), value];
					Redis.client.hset(key, field, JSON.stringify(updatedValue), () => {
						resolve(updatedValue);
					});
				}
			});
		});
	}
}

/* 
client = {
	board : {
		team#1 : [{postIt#1-1},{postIt#1-2},{postIt#1-3}],
		team#2 : [{postIt#2-1},{postIt#2-2},{postIt#2-3}],
		team#3 : [{postIt#3-1},{postIt#3-2},{postIt#3-3}],
	},
	chat : {
		room#1 : [{chat#1-1},{chat#1-2}],
		room#2 : [{chat#2-1},{chat#2-2}],
		room#3 : [{chat#3-1},{chat#3-2}],
	},
}
*/
