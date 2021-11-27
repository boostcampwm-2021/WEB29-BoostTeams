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
	ONLINE_USER: 'online users',
	ENTER_USERS_ROOM: 'enter users room',
	LEAVE_USERS_ROOM: 'leave users room',
	CHANGE_STATUS_TO_ONLINE: 'change status to online',
	DISCONNECT: 'disconnect'
};

const chatEvents = {};

export { boardEvents, teamEvents, chatEvents };
