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
	get(key: string) {
		console.log('redis get');
	}
	set(key: string, value: any) {
		console.log('redis set');
	}
}
