import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { teamListLoadTrigger } from '@src/stores/team';
import Modal from '@src/components/common/Modal';
import { update } from '@src/apis/team';
import { Content, Input } from './style';

interface Props {
	handleModalClose: () => void;
	teamInfo: any;
	teamId: number;
	getTeam: () => void;
}

const UpdateTeamModal: React.FC<Props> = ({ handleModalClose, teamInfo, teamId, getTeam }) => {
	const setLoadTrigger = useSetRecoilState(teamListLoadTrigger);
	const [updateTitle, setUpdateTitle] = useState(teamInfo.team_name);
	const [updateDesc, setUpdateDesc] = useState(teamInfo.team_desc);
	const handleSubmit = async () => {
		await update(setLoadTrigger, {
			team_id: teamId,
			team_name: updateTitle,
			team_desc: updateDesc,
		});
		getTeam();
		handleModalClose();
		console.log(teamInfo.team_id, updateTitle, updateDesc);
	};

	const onTitleInput = (e: any) => setUpdateTitle(e.target.value);
	const onDescInput = (e: any) => setUpdateDesc(e.target.value);

	return (
		<Modal handleModalClose={handleModalClose} handleSubmit={handleSubmit} removeSubmitButton={false}>
			<Content>
				<span>팀 이름</span>
				<Input onChange={onTitleInput} value={updateTitle} placeholder='팀 이름을 입력하세요' />
				<span>세부정보</span>
				<Input onChange={onDescInput} value={updateDesc} placeholder='세부정보를 입력하세요' />
			</Content>
		</Modal>
	);
};

export default UpdateTeamModal;
