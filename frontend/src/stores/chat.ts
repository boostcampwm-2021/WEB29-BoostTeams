import { atom, selector, selectorFamily } from 'recoil';
import { ChatRoomsLastMessageType, MessageListType } from '@src/types/chat';
import { getChatRooms, getChatRoomUsers } from '@apis/chat';
import userState from './user';

export const chatModeState = atom({
	key: 'chatModeState',
	default: { chatMode: 'none' },
});

export const currentChatRoomState = atom({
	key: 'currentChatRoomState',
	default: { currChatRoomId: -1 },
});

export const chatRoomsTrigger = atom({
	key: 'chatRoomsTrigger',
	default: 0,
});

export const chatRoomsSelector = selectorFamily({
	key: 'chatRoomsSelector',
	get:
		(teamId: number) =>
		async ({ get }) => {
			get(chatRoomsTrigger);
			const data = await getChatRooms(teamId, get(userState).id);
			return data;
		},
});

export const chatRoomsLastMessageState = atom({
	key: 'chatRoomsLastMessageState',
	default: {} as ChatRoomsLastMessageType,
});

export const chatRoomUsersTrigger = atom({
	key: 'chatRoomUsersTrigger',
	default: 0,
});

export const chatRoomUsersSelector = selector({
	key: 'chatRoomUsersSelector',
	get: async ({ get }) => {
		get(chatRoomUsersTrigger);
		const data = await getChatRoomUsers(get(currentChatRoomState).currChatRoomId);
		return data;
	},
});

export const messageListState = atom({
	key: 'messageListState',
	default: [] as MessageListType,
});
