import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import UserState from '../../../../../stores/user';

import { check } from '../../../../../apis/auth';
import { updateName } from '../../../../../apis/user';
import { nameRegExp } from '../../../../../utils/regexs';

import Modal from '../../../Modal';

import { Container, Input, Title, InputContainer } from './style';

type Props = {
	handleModalClose: () => void;
};

const UpdateModal: React.FC<Props> = ({ handleModalClose }) => {
	const [name, setName] = useState('');
	const [user, setUser] = useRecoilState(UserState);
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const handleSubmit = () => {
		if (name === '') {
			toast.warn('😮 새 이름을 입력해주세요!');
		} else if (!nameRegExp.test(name) || name.length > 20) {
			toast.warn('😮 올바르지 않은 이름입니다!');
		} else {
			updateName({ newName: name }, () => {
				check(() => {
					setUser({ ...user, name });
					handleModalClose();
				});
			});
		}
	};
	return (
		<Modal handleModalClose={handleModalClose} handleSubmit={handleSubmit} removeSubmitButton={false}>
			<Container>
				<Title>사용자 이름 변경</Title>
				<InputContainer>
					<FaPencilAlt />
					<Input placeholder='2-20자 사이의 영문자, 숫자' value={name} onChange={handleInput} />
				</InputContainer>
			</Container>
		</Modal>
	);
};

export default UpdateModal;
