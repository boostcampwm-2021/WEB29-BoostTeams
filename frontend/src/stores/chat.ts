import { atom, selector, selectorFamily } from 'recoil';
import { getChatRoomInfo, getChatRooms } from '@apis/chat';
import { readTeamUsers } from '@apis/users';
import userState from './user';

export const currentChatRoomState = atom({
	key: 'currentChatRoomState',
	default: { currentChatRoom: -1 },
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

export const chatRoomInfoState = selector({
	key: 'chatRoomInfoState',
	get: async ({ get }) => {
		const data = await getChatRoomInfo(get(currentChatRoomState).currentChatRoom);
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
