import { useHistory } from 'react-router';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { ModalMode, ModalSchedule } from '@stores/calendar';
import userState from '@stores/user';
import { chatModeState, chatRoomsState, chatRoomUsersState, currChatRoomIdState, messagesState } from '@stores/chat';
import { modalState, selectedUser, teamInfoLoadTrigger, teamListLoadTrigger, teamUsersTrigger } from '@stores/team';
import { removeCookie } from '@utils/cookie';

const useLogout = () => {
	const history = useHistory();
	const setTeamListTrigger = useSetRecoilState(teamListLoadTrigger);
	const setTeamInfoTrigger = useSetRecoilState(teamInfoLoadTrigger);
	const setTeamUsersTrigger = useSetRecoilState(teamUsersTrigger);
	const resetList = [
		useResetRecoilState(ModalMode),
		useResetRecoilState(ModalSchedule),
		useResetRecoilState(chatModeState),
		useResetRecoilState(chatRoomsState),
		useResetRecoilState(currChatRoomIdState),
		useResetRecoilState(chatRoomUsersState),
		useResetRecoilState(messagesState),
		useResetRecoilState(selectedUser),
		useResetRecoilState(modalState),
		useResetRecoilState(userState),
	];
	const resetState = () => {
		resetList.forEach((reset) => {
			reset();
		});
		setTeamListTrigger((prev) => prev + 1);
		setTeamInfoTrigger((prev) => prev + 1);
		setTeamUsersTrigger((prev) => prev + 1);
		localStorage.removeItem('JWT');
		removeCookie('JWT');
	};
	return () => {
		resetState();
		history.push('/');
		toast.success('😎 로그아웃 성공');
	};
};

export default useLogout;
