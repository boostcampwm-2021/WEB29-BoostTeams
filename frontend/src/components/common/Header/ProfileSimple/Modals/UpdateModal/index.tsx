import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import userState from '@stores/user';

import { updateName } from '@apis/user';
import { nameRegExp } from '@utils/regexs';
import useCheckLogin from '@hooks/useCheckLogin';

import Modal from '@components/common/Modal';
import { Input } from '@components/common/Modal/style';

import { Container, InputContainer } from './style';

export interface Props {
	handleModalClose: () => void;
}

const UpdateModal: React.FC<Props> = ({ handleModalClose }) => {
	const [name, setName] = useState('');
	const user = useRecoilValue(userState);
	const checkLogin = useCheckLogin();
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const handleSubmit = () => {
		if (name === '') {
			toast.warn('😮 새 이름을 입력해주세요!');
		} else if (name === user.name) {
			toast.warn('😮 같은 이름으로 바꿀 수 없습니다!');
		} else if (!nameRegExp.test(name) || name.length > 20) {
			toast.warn('😮 올바르지 않은 이름입니다!');
		} else {
			updateName({ newName: name }, () => {
				checkLogin();
				handleModalClose();
			});
		}
	};
	return (
		<Modal
			title='사용자 이름 변경'
			handleModalClose={handleModalClose}
			handleSubmit={handleSubmit}
			removeSubmitButton={false}
		>
			<Container>
				<InputContainer>
					<FaPencilAlt />
					<Input placeholder='2-20자 사이의 한글, 영문자, 숫자' value={name} onChange={handleInput} />
				</InputContainer>
			</Container>
		</Modal>
	);
};

export default UpdateModal;
