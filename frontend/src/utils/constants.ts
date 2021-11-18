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
	YELLOW = '#effd5f',
	BABYPINK = '#FCC7CF',
	HOTPINK = '#D85678',
	BABYGREEN = '#C5E89B',
	DEEPGREEN = '#2B4D00',
	GREEN = '#008000',
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

const PostIt = {
	Length: {
		Width: 250,
		Height: 250,
	},
	Position: {
		CONTENT: {
			Y: 15,
		},
		FOOTER: {
			X: 120,
			Y: 235,
		},
	},
};

const NAVBAR = {
	WIDTH: 4.2,
};

const HEADER = {
	HEIGHT: 3,
};

const converRemToPx = (rem: number) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
const CANVAS = {
	WITDH: window.innerWidth - converRemToPx(NAVBAR.WIDTH),
	HEIGHT: window.innerHeight - converRemToPx(HEADER.HEIGHT),
};

const REM = 16; // TODO: 반응형 (style과 별도로 적용)

type RoleType = {
	[key: number]: string;
};

const Role: RoleType = {
	0: '관리자',
	1: '구성원',
};

export { ColorCode, Font, PrimaryPalette, SecondaryPalette, TeamCard, PostIt, Role };
export { CANVAS, NAVBAR, HEADER, REM };
