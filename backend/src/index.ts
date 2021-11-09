import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';

import passport from 'passport';
import { initStrategy } from './passport';

import SocketIO from './sockets';
import userRouter from './routes/user-router';
import authRouter from './routes/auth-router';
import scheduleRouter from './routes/schedule-router';
import teamUserRouter from './routes/team-user-router';

class App {
	app: express.Application;
	server: any; // Server from http? https?
	port: string;

	constructor() {
		this.app = express();
		this.port = process.env.PORT || '4000';
		this.config();
		this.middleware();
		this.route();
	}

	private config() {
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.json());
		createConnection()
			.then(() => {
				console.log('DB Connected');
			})
			.catch((error) => console.error(error));
	}

	private middleware() {
		const corsOptions = {
			origin: process.env.FRONT_URL || 'http://localhost:3000',
			credentials: true
		};
		this.app.use(cors(corsOptions));
		this.app.use(passport.initialize());
		initStrategy();
	}

	private route() {
		// this.app.use('/api/user', userRouter);
		this.app.use('/api/auth', authRouter);
		this.app.use('/api/schedule', scheduleRouter);
		this.app.use('/api/users', teamUserRouter);
	}

	listen() {
		this.server = this.app.listen(this.port, () => {
			console.log(`LISTEN ON PORT ${this.port}`);
		});

		const corsOptions = {
			cors: true,
			origins: [process.env.FRONT_URL || 'http://localhost:3000']
		};

		SocketIO.attach(this.server, corsOptions);
	}
}

const app = new App();

app.listen();
