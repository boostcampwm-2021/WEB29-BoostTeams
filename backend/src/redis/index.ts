import { createClient } from 'redis';

function initRedis() {
	const client = createClient({
		host: process.env.REDIS_HOST,
		port: Number(process.env.REDIS_PORT)
	});
	client.on('connect', () => {
		console.log('redis connect');
	});
	client.on('error', (error) => {
		console.log('redis error');
		console.log(error);
	});
}

export default initRedis;
