import Redis from '@redis/index';
import { MessageType, MessageReqType, ChatRoomType } from '../customeTypes/chat';

const redisClient = new Redis();

const MessageService = {
	getLastMessage: async (chatRoomId: number) => {
		const messageList: any = await redisClient.read(MESSAGE, String(chatRoomId));
		return messageList[messageList.length - 1];
	},
	getChatRoomsLastMessage: async (chatRoomsData: ChatRoomType[]) => {
		const lastMessages = await Promise.all(
			chatRoomsData.map(async ({ chat_room_id }) => MessageService.getLastMessage(chat_room_id))
		);
		const chatRoomsLastMessage = chatRoomsData.map((chatRoom) => {
			return {
				chatRoomId: chatRoom.chat_room_id,
				chatRoomName: chatRoom.chat_room_name,
				lastMessage: lastMessages.find((message: MessageType) => message.chatRoomId === chatRoom.chat_room_id)
			};
		});
		return chatRoomsLastMessage;
	},
	getMessageList: async (chatRoomId: number) => {
		const messageList = await redisClient.read(MESSAGE, String(chatRoomId));
		return messageList;
	},
	saveMessage: async (messageData: MessageReqType, chatRoomId: number) => {
		const newMessage = await makeMessageObj(messageData);
		await redisClient.create(MESSAGE, String(chatRoomId), newMessage);
		return newMessage;
	}
};

const makeMessageObj = async (messageData: MessageReqType) => {
	const id = Number(await Redis.getIndex());
	return {
		messageId: id,
		content: messageData.content,
		createdAt: new Date(),
		userId: messageData.userId,
		chatRoomId: messageData.chatRoomId
	};
};

const MESSAGE = 'message';

export default MessageService;
