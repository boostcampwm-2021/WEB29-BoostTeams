import { atom } from 'recoil';

const UserState = atom({
	key: 'userState',
	default: { id: -1, name: '', email: '', state: 0, team_id: 1, github: '' },
});

export default UserState;
