import { atom } from 'recoil';
import { ChatRoomListType, MessageListType } from '@src/types/chat';
import { UserIdType } from '@src/types/team';

export const chatModeState = atom({
	key: 'chatModeState',
	default: 'none',
});

export const chatRoomsState = atom({
	key: 'chatRoomsState',
	default: [] as ChatRoomListType,
});

export const currChatRoomIdState = atom({
	key: 'currChatRoomIdState',
	default: -1,
});

export const chatRoomUsersState = atom({
	key: 'chatRoomUsersState',
	default: [] as UserIdType[],
});

export const messagesState = atom({
	key: 'messagesState',
	default: [] as MessageListType,
});
