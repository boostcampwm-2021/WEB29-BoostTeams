import React, { useState, useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { KonvaEventObject } from 'konva/lib/Node';
import userState from '@src/stores/user';
import { teamUsersSelector } from '@stores/team';
import BoardTemplate from '@templates/BoardTemplate';
import { HEADER, NOBODY } from '@utils/constants';
import { SocketContext } from '@utils/socketContext';
import { IPostit } from '@src/types/board';
import { throttle } from '@utils/throttle';
import socketApi from '@src/apis/socket';

interface MatchParams {
	teamId: string;
}
type Props = RouteComponentProps<MatchParams>;

const BoardPage: React.FC<Props> = ({ match }) => {
	const [postits, setPostits] = useState<IPostit[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [modalType, setModalType] = useState('create');
	const [clickedPostit, setClickedPostit] = useState<IPostit>();
	const user = useRecoilValue(userState);
	const handleModalOpen = () => setShowModal(true);
	const handleModalClose = () => setShowModal(false);

	const teamId = Number(match.params.teamId);
	const teamUserList = useRecoilValue(teamUsersSelector(teamId));
	const getUserNameById = (userId: number) =>
		Object.values(teamUserList).find((user) => Number(user.userId) === Number(userId))?.name ?? '';

	const socket = useContext(SocketContext).current;

	const setUpdatedPostit = (newPostit: IPostit) => {
		setPostits((previousPostitList: IPostit[]) => {
			const postitIdx = previousPostitList.findIndex((elem) => Number(newPostit.id) === Number(elem.id));
			if (postitIdx !== -1) previousPostitList.splice(postitIdx, 1);
			return [...previousPostitList, newPostit];
		});
	};

	const setUpdatedPostitList = (initPoistList: IPostit[]) => setPostits(initPoistList);

	const handleDragStart = (e: KonvaEventObject<DragEvent>) => {
		const id = Number(e.target.id());
		const postitList = [...postits];
		const postitIdx = postitList.findIndex((postit) => Number(postit.id) === id);
		const postit = { ...postitList.splice(postitIdx, 1)[0], whoIsDragging: user.id };
		postitList.push(postit);
		setPostits(postitList);
		setShowDelete(true);
	};

	const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
		socketApi.dragEndPostit(socket, e);
		const id = Number(e.target.id());
		const postitList = [...postits];
		const postitIdx = postitList.findIndex((postit) => Number(postit.id) === id);
		postitList[postitIdx] = {
			...postitList[postitIdx],
			x: e.target.x() / window.innerWidth,
			y: e.target.y() / window.innerHeight,
			whoIsDragging: NOBODY,
		};
		setPostits(postitList);
		setShowDelete(false);
		const mouseY = (e.target.parent?.getRelativePointerPosition().y ?? 0) + HEADER.HEIGHT;
		if (mouseY > (window.innerHeight / 10) * 9 && mouseY < window.innerHeight) {
			socketApi.deletePostit(socket, Number(e.target.id()));
		}
	};

	const thorttleDrag = throttle(socketApi.dragPostit, 30);
	const handleDrag = (e: KonvaEventObject<DragEvent>) => {
		thorttleDrag(socket, e, user.id);
	};

	useEffect(() => {
		if (socket) {
			socketApi.enterBoardPage(socket);
			socket.on('join board page', (postits: IPostit[]) => setUpdatedPostitList(postits));
			socket.on('delete postit', (postits: IPostit[]) => setUpdatedPostitList(postits));
			socket.on('create new postit', (postits: IPostit) => setUpdatedPostit(postits));
			socket.on('update start postit', (postit: IPostit) => setUpdatedPostit(postit));
			socket.on('update end postit', (postit: IPostit) => setUpdatedPostit(postit));
			socket.on('drag postit', (postit: IPostit) => setUpdatedPostit(postit));
			socket.on('drag end postit', (postit: IPostit) => setUpdatedPostit(postit));
			socket.on('team board error', (errorMessage: string) => toast.error(errorMessage));
		}
		return () => {
			if (socket) {
				socketApi.leaveBoardPage(socket);
				socket.off('join board page');
				socket.off('create new postit');
				socket.off('delete postit');
				socket.off('update start postit');
				socket.off('update end postit');
				socket.off('drag postit');
				socket.off('drag end postit');
				socket.off('team board error');
			}
		};
	}, [socket, teamId]);

	return (
		<BoardTemplate
			postits={postits}
			showModal={showModal}
			modalType={modalType}
			clickedPostit={clickedPostit}
			getUserNameById={getUserNameById}
			setModalType={setModalType}
			setClickedPostit={setClickedPostit}
			handleModalOpen={handleModalOpen}
			handleModalClose={handleModalClose}
			handleDrag={handleDrag}
			handleDragStart={handleDragStart}
			handleDragEnd={handleDragEnd}
			showDelete={showDelete}
		/>
	);
};

export default BoardPage;
