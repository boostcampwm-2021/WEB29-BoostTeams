import { atom } from 'recoil';

const UserState = atom({
	key: 'userState',
	default: { name: '', email: '', state: 0 },
});

export default UserState;
