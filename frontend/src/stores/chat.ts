import { atom, selector, selectorFamily } from 'recoil';
import { ChatRoomsLastMessageType } from '@src/types/chat';
import { getChatRooms, getChatRoomUsers } from '@apis/chat';
import { readTeamUsers } from '@apis/users';
import userState from './user';

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

export const chatRoomUsersSelector = selector({
	key: 'chatRoomUsersSelector',
	get: async ({ get }) => {
		const data = await getChatRoomUsers(get(currentChatRoomState).currChatRoomId);
		return data;
	},
});

export const messageListState = atom({
	key: 'messageListState',
	default: [],
});

export const teamUsersSelector = selectorFamily({
	key: 'teamUsersSelector',
	get: (teamId: number) => async () => {
		const data = await readTeamUsers(teamId);
		const entries = data.map(({ user }: any) => {
			return [
				user.user_id,
				{ userId: user.user_id, name: user.user_name, email: user.user_email, color: user.user_color },
			];
		});
		const teamUsers = Object.fromEntries(entries);
		return teamUsers;
	},
});
