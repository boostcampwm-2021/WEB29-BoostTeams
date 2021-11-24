import { atom, selector, selectorFamily } from 'recoil';
import { LastMessagesType, MessageListType } from '@src/types/chat';
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

export const LastMessagesState = atom({
	key: 'LastMessagesState',
	default: {} as LastMessagesType,
});

export const chatRoomUsersTrigger = atom({
	key: 'chatRoomUsersTrigger',
	default: 0,
});

export const chatRoomUsersSelector = selector({
	key: 'chatRoomUsersSelector',
	get: async ({ get }) => {
		get(chatRoomUsersTrigger);
		if (get(currentChatRoomState).currChatRoomId !== -1) {
			const data = await getChatRoomUsers(get(currentChatRoomState).currChatRoomId);
			return data;
		}
		return { userList: [] };
	},
});

export const messageListState = atom({
	key: 'messageListState',
	default: [] as MessageListType,
});
