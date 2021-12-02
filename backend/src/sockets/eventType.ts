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

const teamEvents = {
	ONLINE_USERS: 'online users',
	ENTER_USERS_PAGE: 'enter users page',
	LEAVE_USERS_PAGE: 'leave users page',
	CHANGE_STATUS_TO_ONLINE: 'change status to online',
	DISCONNECT: 'disconnect'
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
		MESSAGES: {
			LOAD: '채팅방 목록을 불러오는데 실패했습니다!',
			ENTER: '채팅 목록을 불러오는데 실패했습니다!',
			CREATE: '채팅방 생성에 실패했습니다!',
			UPDATE: '채팅방 이름 변경에 실패했습니다!',
			LEAVE: '채팅방 나가기에 실패했습니다!',
			INVITE: '초대에 실패했습니다!',
			SEND: '채팅 전송에 실패했습니다!'
		}
	}
};

export { boardEvents, teamEvents, chatEvents };
