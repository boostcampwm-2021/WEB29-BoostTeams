import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Redis from './redis';
import express from 'express';
import cors from 'cors';

import passport from 'passport';
import { initStrategy } from './passport';

import { Namespace, Server } from 'socket.io';
import socketInit from './sockets';

import userRouter from '@routes/user-router';
import authRouter from '@routes/auth-router';
import scheduleRouter from '@routes/schedule-router';
import teamRouter from '@routes/team-router';
import chatRouter from '@routes/chat-router';

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
		new Redis();
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
		this.app.use('/api/user', userRouter);
		this.app.use('/api/auth', authRouter);
		this.app.use('/api/schedule', scheduleRouter);
		this.app.use('/api/team', teamRouter);
		this.app.use('/api/chat', chatRouter);
	}

	listen() {
		this.server = this.app.listen(this.port, () => {
			console.log(`LISTEN ON PORT ${this.port}`);
		});

		const corsOptions = {
			cors: { origin: [process.env.FRONT_URL || 'http://localhost:3000'] }
		};

		const io: Server = new Server(this.server, corsOptions);
		const namespace: Namespace = io.of(/^\/socket\/team-\d+$/);
		socketInit(namespace);
	}
}

const app = new App();

app.listen();
