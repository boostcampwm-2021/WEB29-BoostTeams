import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { teamInfoLoadTrigger, teamInfoSelector } from '@stores/team';
import { update } from '@apis/team';
import Modal from '@components/common/Modal';
import { Input, Textarea } from '@components/common/Modal/style';
import { InputContainer } from '../style';

export interface Props {
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
	const onDescInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => setUpdateDesc(e.currentTarget.value);

	return (
		<Modal
			title='팀 수정'
			handleModalClose={handleModalClose}
			handleSubmit={handleSubmit}
			removeSubmitButton={false}
			submitBtnName='수정'
		>
			<InputContainer>
				<Input onChange={onTitleInput} value={updateTitle} placeholder='팀 이름을 입력하세요' />
				<Textarea onChange={onDescInput} value={updateDesc} placeholder='세부정보를 입력하세요' />
			</InputContainer>
		</Modal>
	);
};

export default UpdateTeamModal;
