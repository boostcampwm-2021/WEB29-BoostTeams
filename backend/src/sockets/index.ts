import { Socket } from 'socket.io';

const io = require('socket.io');
const socketIO = io();

interface UserType {
	userId: string;
	socketId: string;
	state: number;
}

// {team_id1: [{user_id, socket_id, state}], team_id2: [{user_id, socket_id, state}]}
let userListByTeam = {};

const userConnected = (teamId: number, userId: string): boolean => {
	if(!userListByTeam[teamId]) return false;
	return userListByTeam[teamId].filter((user: UserType) => user.userId === userId).length > 0;
}

socketIO.on('connect', (socket: Socket) => {
	console.log('socket connect');

	socket.on('check team join', ({teamId, userId}: {teamId: number, userId: string}) => {
		socket.emit('check team join result', { teamId, userId, result: userConnected(teamId, userId) });
	})

	socket.on('join team', ({teamId, userId}: {teamId: number, userId: string}) => {
		const socketId = socket.id;
		const state = 0;
		userListByTeam[teamId] ? userListByTeam[teamId].push({userId, socketId, state}) : userListByTeam[teamId] = [{userId, socketId, state}];
		socket.join(teamId.toString());
		console.log(userListByTeam)
	})
	socket.disconnect
});

/*
최초 접속시 소켓 연결
`const socket = io()`
팀 유저 온라인 객체
최초 {}
형식 `{team_id1: [], team_id2: []}`

팀 선택 페이지 -> 팀 id: 1 로 들어가면
`socket.join(teamId)`
팀 온라인 유저 배열에 유저 추가
`arr.team_id1 ? arr.team_id = [{userId, state, socketId}] : arr.team_id.push({userId, state})`

팀 선택 페이지로 나오거나 다른 팀으로 접속하거나 disconnect 시
`socket.leave(teamId);`
arr.team_id 배열에서 user 삭제
*/

export default socketIO;
