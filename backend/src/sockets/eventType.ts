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
		MESSAGES: {
			LOAD: '포스트잇을 불러오는데 실패했습니다!',
			CREATE: '새로운 포스트잇 생성 실패!',
			UPDATE: '포스트잇을 업데이트 할 수 없습니다!',
			DELETE: '포스트잇 삭제 실패!'
		}
	}
};

const teamEvents = {};

const chatEvents = {
	ENTER_CHAT_ROOMS: 'enter chat rooms',
	RECEIVE_LAST_MESSAGES: 'receive last messages',
	LEAVE_CHAT_ROOMS: 'leave chat rooms',
	GET_MESSAGE_LIST: 'get message list',
	RECEIVE_MESSAGE_LIST: 'receive message list',
	SEND_MESSAGE: 'send message',
	RECEIVE_MESSAGE: 'receive message',
	UPDATE_CHAT_ROOM_NAME: 'update chat room name',
	CREATE_CHAT_ROOM: 'create chat room',
	REFRESH_CHAT_ROOMS: 'refresh chat rooms',
	REFRESH_CHAT_ROOM_USERS: 'refresh chat room users'
};

export { boardEvents, teamEvents, chatEvents };
