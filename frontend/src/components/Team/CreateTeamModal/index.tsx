import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import { teamListLoadTrigger } from '@stores/team';
import { create } from '@apis/team';
import Modal from '@components/common/Modal';
import { Input, Textarea } from '@components/common/Modal/style';

import { Container } from './style';

type Props = {
	handleModalClose: () => void;
};

const CreateTeamModal: React.FC<Props> = ({ handleModalClose }) => {
	const loadTrigger = useSetRecoilState(teamListLoadTrigger);
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');

	const inputNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const inputDescHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDesc(e.target.value);
	};

	const handleSubmit = () => {
		if (name !== '') {
			const teamData = {
				team_name: name,
				team_desc: desc,
			};
			create(loadTrigger, teamData);
			handleModalClose();
		} else {
			toast.warn('😮 팀 이름을 입력해주세요!');
		}
	};

	return (
		<Modal
			title='팀 만들기'
			handleModalClose={handleModalClose}
			handleSubmit={handleSubmit}
			removeSubmitButton={false}
			submitBtnName='생성'
		>
			<Container>
				<Input onChange={inputNameHandler} value={name} placeholder='팀 이름을 입력하세요' />
				<Textarea onChange={inputDescHandler} value={desc} placeholder='팀에 대한 세부 정보를 입력하세요' />
			</Container>
		</Modal>
	);
};

export default CreateTeamModal;
