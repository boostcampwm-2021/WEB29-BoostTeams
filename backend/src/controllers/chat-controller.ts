import { Request, Response } from 'express';
import ChatRoomService from '@services/chat-room-service';

const ChatController = {
	async createChatRoom(req: Request, res: Response) {
		try {
			const chatRoomInfo = req.body;
			const chatRoomResult = await ChatRoomService.getInstance().createChatRoom(chatRoomInfo);
			res.status(201).json(chatRoomResult);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async getChatRooms(req: Request, res: Response) {
		try {
			const { userId, teamId } = req.query;
			if (!userId || !teamId) throw Error();
			const chatRooms = await ChatRoomService.getInstance().getChatRooms(Number(teamId), Number(userId));
			res.status(200).json(chatRooms);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async updateChatRoomName(req: Request, res: Response) {
		try {
			const { chatRoomId } = req.params;
			const chatRoomName = req.body.chat_room_name;
			await ChatRoomService.getInstance().updateChatRoomName(Number(chatRoomId), chatRoomName);
			res.sendStatus(201);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async getChatRoomUsers(req: Request, res: Response) {
		try {
			const { chatRoomId } = req.params;
			const chatRoomInfo = await ChatRoomService.getInstance().getChatRoomUsers(Number(chatRoomId));
			res.status(200).json(chatRoomInfo);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async addChatRoomUsers(req: Request, res: Response) {
		try {
			const { chatRoomId } = req.params;
			const { user_list } = req.body;
			await ChatRoomService.getInstance().addChatRoomUsers(Number(chatRoomId), user_list);
			res.sendStatus(201);
		} catch (err) {
			res.sendStatus(409);
		}
	},

	async deleteChatRoomUser(req: Request, res: Response) {
		try {
			const { chatRoomId, userId } = req.params;
			await ChatRoomService.getInstance().deleteChatRoomUser(Number(chatRoomId), Number(userId));
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(409);
		}
	}
};

export default ChatController;
