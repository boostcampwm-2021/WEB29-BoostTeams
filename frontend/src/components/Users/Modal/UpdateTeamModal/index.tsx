import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { teamInfoLoadTrigger, teamInfoSelector } from '@stores/team';
import Modal from '@components/common/Modal';
import { update } from '@apis/team';
import { UpdateModalContent, Input } from '../style';

interface Props {
	handleModalClose: () => void;
	teamId: number;
}

const UpdateTeamModal: React.FC<Props> = ({ handleModalClose, teamId }) => {
	const teamInfo = useRecoilValue(teamInfoSelector(teamId));
	const setLoadTrigger = useSetRecoilState(teamInfoLoadTrigger);
	const [updateTitle, setUpdateTitle] = useState(teamInfo.team_name);
	const [updateDesc, setUpdateDesc] = useState(teamInfo.team_desc);
	const handleSubmit = async () => {
		await update(setLoadTrigger, teamId, {
			team_name: updateTitle,
			team_desc: updateDesc,
		});
		handleModalClose();
	};

	const onTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => setUpdateTitle(e.currentTarget.value);
	const onDescInput = (e: React.ChangeEvent<HTMLInputElement>) => setUpdateDesc(e.currentTarget.value);

	return (
		<Modal handleModalClose={handleModalClose} handleSubmit={handleSubmit} removeSubmitButton={false}>
			<UpdateModalContent>
				<span>팀 이름</span>
				<Input onChange={onTitleInput} value={updateTitle} placeholder='팀 이름을 입력하세요' />
				<span>세부정보</span>
				<Input onChange={onDescInput} value={updateDesc} placeholder='세부정보를 입력하세요' />
			</UpdateModalContent>
		</Modal>
	);
};

export default UpdateTeamModal;
