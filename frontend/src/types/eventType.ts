const boardEvents = {
	ENTER_PAGE: 'join board page',
	LEAVE_PAGE: 'leave board page',
	CREATE_POSTIT: 'create new postit',
	UPDATE_START: 'update start postit',
	UPDATE_END: 'update end postit',
	DRAG_START: 'drag postit',
	DRAG_END: 'drag end postit',
	DELETE: 'delete postit',
	ERROR: {
		TYPE: 'team board error',
	},
};

const teamEvents = {
	ONLINE_USERS: 'online users',
	ENTER_USERS_PAGE: 'enter users page',
	LEAVE_USERS_PAGE: 'leave users page',
	CHANGE_STATUS_TO_ONLINE: 'change status to online',
	DISCONNECT: 'disconnect',
};

const chatEvents = {
	ENTER_CHAT_PAGE: 'enter chat page',
	ENTER_CHAT_ROOM: 'enter chat room',
	RECEIVE_CHAT_ROOMS_INFO: 'receive chat rooms info',
	RECEIVE_CHAT_ROOM_INFO: 'receive chat room info',
	SEND_MESSAGE: 'send message',
	RECEIVE_MESSAGE: 'receive message',
	CREATE_CHAT_ROOM: 'create chat room',
	INVITE_USERS: 'invite users',
	JOIN_CHAT_ROOM: 'join chat room',
	EXIT_CHAT_ROOM: 'exit chat room',
	LEFT_CHAT_ROOM: 'left chat room',
	UPDATE_CHAT_ROOM_NAME: 'update chat room name',
	UPDATED_CHAT_ROOM_NAME: 'updated chat room name',
	INVITED_TO_CHAT_ROOM: 'invited to chat room',
	ERROR: {
		TYPE: 'chat error',
	},
};

export { boardEvents, teamEvents, chatEvents };
