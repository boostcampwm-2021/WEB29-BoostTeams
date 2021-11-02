import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';

import SocketIO from './sockets';
import indexRouter from './routes/index';
import userRouter from './routes/user-router';

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
			origin: process.env.FRONT_HOST || 'http://localhost:3000',
			credentials: true
		};
		this.app.use(cors(corsOptions));
	}

	private route() {
		this.app.use('/', indexRouter);
		this.app.use('/api/user', userRouter);
	}

	listen() {
		this.server = this.app.listen(this.port, () => {
			console.log(`LISTEN ON PORT ${this.port}`);
		});

		const corsOptions = {
			cors: true,
			origins: [process.env.FRONT_HOST || 'http://localhost:3000']
		};

		SocketIO.attach(this.server, corsOptions);
	}
}

const app = new App();

app.listen();
