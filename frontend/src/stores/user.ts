import { atom } from 'recoil';

const userState = atom({
	key: 'userState',
	default: { id: -1, name: '', email: '', color: 0, github_id: '', github_name: '' },
});

export default userState;
