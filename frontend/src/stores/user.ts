import { atom } from 'recoil';

const userState = atom({
	key: 'userState',
	default: { id: -1, name: '', email: '', color: 0, team_id: 1, github_id: '', github_name: '' },
});

export default userState;
