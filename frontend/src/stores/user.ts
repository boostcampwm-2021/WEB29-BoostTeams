import { atom } from 'recoil';

const UserState = atom({
	key: 'userState',
	default: { name: '', email: '', state: 0, team_id: 1 },
});

export default UserState;
