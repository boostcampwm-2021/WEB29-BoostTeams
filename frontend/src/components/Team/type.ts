export type TeamData = {
	team_id: number;
	team_name: string;
	team_desc: string;
};

export type CardData = {
	team_user_id: number;
	state: boolean;
	team: TeamData;
};
