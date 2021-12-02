const request = require('supertest');
const app = require('../../src/index');
const ormconfig = require('../../ormconfig');
const { createConnection } = require('typeorm');

describe('Auth 테스트', () => {
	beforeAll(async () => {
		await createConnection(ormconfig);
		await request(app).post('/api/auth/signup').send({
			userName: 'auth-test',
			userEmail: 'test@naver.com',
			userPassword: 'test123test123'
		});
	}, 30000);

	test('일반 로그인 성공', async () => {
		const res = await request(app).post('/api/auth/login').send({
			userEmail: 'test@naver.com',
			userPassword: 'test123test123'
		});
		const user = await res.body;
		expect(res.status).toBe(200);
		expect(user.user_email).toEqual('test@naver.com');
	}, 30000);

	test('로그인 비밀번호 불일치', async () => {
		const res = await request(app).post('/api/auth/login').send({
			userEmail: 'test@naver.com',
			userPassword: 'test123test1'
		});
		expect(res.status).toEqual(401);
	}, 30000);

	test('회원가입', async () => {
		const res = await request(app)
			.post('/api/auth/signup')
			.send({
				userName: randomStr(),
				userEmail: `${randomStr()}@test.com`,
				userPassword: 'test123test123'
			});
		const result = await res.body;
		expect(res.status).toEqual(200);
		expect(result).toEqual({ signup: true });
	}, 30000);

	test('이미 존재하는 이메일로 회원가입', async () => {
		const res = await request(app).post('/api/auth/signup').send({
			userName: randomStr(),
			userEmail: 'test@naver.com',
			userPassword: 'test123test123'
		});
		const result = await res.body;
		expect(res.status).toEqual(409);
		expect(result).toEqual({ conflict: 'email' });
	}, 30000);

	test('이미 존재하는 이름으로 회원가입', async () => {
		const res = await request(app)
			.post('/api/auth/signup')
			.send({
				userName: 'auth-test',
				userEmail: `${randomStr()}@test.com`,
				userPassword: 'test123test123'
			});
		const result = await res.body;
		expect(res.status).toEqual(409);
		expect(result).toEqual({ conflict: 'name' });
	}, 30000);
});

const randomStr = () => Math.random().toString(36).substr(2, 9);
