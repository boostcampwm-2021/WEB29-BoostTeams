enum ColorCode {
	PRIMARY1 = '#464775',
	PRIMARY2 = '#C7BFEE',
	FONT_BASE = '#242424',
	FONT1 = '#616161',
	FONT2 = '#ADADAD',
	LINE1 = '#EBEBEB',
	LINE2 = '#D1D1D1',
	LINE3 = '#888888',
	BACKGROUND1 = '#F5F5F5',
	BACKGROUND2 = '#F0F0F0',
	PLACEHOLDER = '#BBBBBB',
	WHITE = '#FFFFFF',
	BLACK = '#000000',
	GRAY = '#808080',
	RED = '#FF0000',
	ORANGE = '#FFA500',
	HOVER = '#6264a7',
	MINT = '#92ddc8',
	DARKMINT = '#0a3a2a',
	BABYBLUE = '#c9eaff',
	DARKBLUE = '#274472',
	YELLOW = '#FFD972',
	BABYPINK = '#FCC7CF',
	HOTPINK = '#D85678',
	BABYGREEN = '#C5E89B',
	DEEPGREEN = '#2B4D00',
	GREEN = '#008000',
	ERROR = '#b8283c',
}

enum Font {
	LARGE = '1.5rem',
	MEDIUM = '1rem',
	SMALL = '0.9rem',
	X_SMALL = '0.8rem',
}

const PrimaryPalette = [
	ColorCode.PRIMARY2,
	ColorCode.BABYPINK,
	ColorCode.BABYGREEN,
	ColorCode.MINT,
	ColorCode.YELLOW,
	ColorCode.BABYBLUE,
];

const SecondaryPalette = [
	ColorCode.PRIMARY1,
	ColorCode.HOTPINK,
	ColorCode.DEEPGREEN,
	ColorCode.DARKMINT,
	ColorCode.ORANGE,
	ColorCode.DARKBLUE,
];

const TeamCard = {
	BORDER_RADIUS: '1rem',
	WIDTH: '15rem',
	HEIGHT: '15rem',
};

const REM = window.innerWidth * 0.0035 + 8.74; // 0.35vw + 8.74px

// const converRemToPx = (rem: number) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

const NAVBAR = {
	WIDTH: 4.2 * REM,
};

const HEADER = {
	HEIGHT: 3 * REM,
};

const CANVAS = {
	WIDTH: window.innerWidth - NAVBAR.WIDTH,
	HEIGHT: window.innerHeight - HEADER.HEIGHT,
};

const POSTIT = {
	WIDTH: 16 * REM,
	HEIGHT: 16 * REM,
};

type RoleType = {
	[key: number]: string;
};

const Role: RoleType = {
	0: '관리자',
	1: '구성원',
};

const RoleArr = ['관리자', '구성원'];

const MODAL_THEME = {
	FORM: 'form',
	NOTIFICATION: 'notification',
};

const NOBODY = -1;

enum DayCode {
	'일요일' = 0,
	'월요일' = 1,
	'화요일' = 2,
	'수요일' = 3,
	'목요일' = 4,
	'금요일' = 5,
	'토요일' = 6,
}

const WeekContentNumber: any = {
	MSEC_TO_HOUR: 60000,
	HALF_HOUR_TO_MIN: 30,
	HOUR_TO_MIN: 60,
	LINE_SPACE_PX: 2.5 * 16,
	EXTRA_SPACE_PX: 10,
	WEEK_NUMBER: 7,
	DAY_TIME_NUMBER: 48,
	TIME_LIST: [
		{ hour: 12, text: '오전' },
		{ hour: 1, text: '오전' },
		{ hour: 2, text: '오전' },
		{ hour: 3, text: '오전' },
		{ hour: 4, text: '오전' },
		{ hour: 5, text: '오전' },
		{ hour: 6, text: '오전' },
		{ hour: 7, text: '오전' },
		{ hour: 8, text: '오전' },
		{ hour: 9, text: '오전' },
		{ hour: 10, text: '오전' },
		{ hour: 11, text: '오전' },
		{ hour: 12, text: '오후' },
		{ hour: 1, text: '오후' },
		{ hour: 2, text: '오후' },
		{ hour: 3, text: '오후' },
		{ hour: 4, text: '오후' },
		{ hour: 5, text: '오후' },
		{ hour: 6, text: '오후' },
		{ hour: 7, text: '오후' },
		{ hour: 8, text: '오후' },
		{ hour: 9, text: '오후' },
		{ hour: 10, text: '오후' },
		{ hour: 11, text: '오후' },
	],
};

export { ColorCode, Font, PrimaryPalette, SecondaryPalette, TeamCard, Role, RoleArr };
export { REM, NAVBAR, HEADER, CANVAS, POSTIT, MODAL_THEME, NOBODY };
export { DayCode, WeekContentNumber };
