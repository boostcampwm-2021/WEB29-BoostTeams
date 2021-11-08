import { atom } from 'recoil';

export const ModalState = atom({
	key: 'isModalVisible',
	default: {
		isModalVisible: false
	},
});