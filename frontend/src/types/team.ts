export interface TeamUserType {
	userId: number;
	name: string;
	email: string;
	color: number;
	role: '관리자' | '구성원';
}

export interface TeamUsersType {
	[userId: number]: TeamUserType;
}

export interface TeamUsersResType {
	role: number;
	user: { user_id: number; user_email: string; user_name: string; user_color: number };
}

export interface UserIdType {
	userId: number;
}
