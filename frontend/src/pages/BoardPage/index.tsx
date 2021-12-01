import React, { useState, useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { KonvaEventObject } from 'konva/lib/Node';
import userState from '@src/stores/user';
import { teamUsersSelector } from '@stores/team';
import BoardTemplate from '@templates/BoardTemplate';
import { HEADER } from '@utils/constants';
import { SocketContext } from '@utils/socketContext';
import { IPostit } from '@src/types/board';
import { throttle } from '@utils/throttle';

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
	const socket = useContext(SocketContext);
	const socketApi = {
		setUpdatedPostitList: (initPoistList: IPostit[]) => setPostits(initPoistList),
		createNewPostit: (newPostit: IPostit) => socket.current.emit('create new postit', newPostit),
		updateStartPostit: (targetId: number) =>
			socket.current.emit('update start postit', { id: targetId, whoIsUpdating: user.id }),
		updateEndPostit: (newPostit: IPostit) =>
			socket.current.emit('update end postit', { ...newPostit, whoIsUpdating: -1 }),
		deletePostit: (targetId: number) => socket.current.emit('delete postit', targetId),
		dragPostit: (e: KonvaEventObject<DragEvent>) => {
			const id = e.target.id();
			const x = e.target.x() / window.innerWidth;
			const y = e.target.y() / window.innerHeight;
			const whoIsDragging = user.id;
			socket.current.emit('drag postit', { id, x, y, whoIsDragging });
		},
		dragEndPostit: (e: KonvaEventObject<DragEvent>) => {
			const id = e.target.id();
			const x = e.target.x() / window.innerWidth;
			const y = e.target.y() / window.innerHeight;
			const whoIsDragging = -1;
			socket.current.emit('drag end postit', { id, x, y, whoIsDragging });
		},
		setUpdatedPostit: (newPostit: IPostit) => {
			setPostits((previousPostitList: IPostit[]) => {
				const postitIdx = previousPostitList.findIndex((elem) => Number(newPostit.id) === Number(elem.id));
				if (postitIdx !== -1) previousPostitList.splice(postitIdx, 1);
				return [...previousPostitList, newPostit];
			});
		},
	};

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
		socketApi.dragEndPostit(e);
		const id = Number(e.target.id());
		const postitList = [...postits];
		const postitIdx = postitList.findIndex((postit) => Number(postit.id) === id);
		postitList[postitIdx] = {
			...postitList[postitIdx],
			x: e.target.x() / window.innerWidth,
			y: e.target.y() / window.innerHeight,
			whoIsDragging: -1,
		};
		setPostits(postitList);
		setShowDelete(false);
		const mouseY = (e.target.parent?.getRelativePointerPosition().y ?? 0) + HEADER.HEIGHT;
		if (mouseY > (window.innerHeight / 10) * 9 && mouseY < window.innerHeight) {
			socketApi.deletePostit(Number(e.target.id()));
		}
	};

	const thorttleDrag = throttle(socketApi.dragPostit, 30);
	const handleDrag = (e: KonvaEventObject<DragEvent>) => {
		thorttleDrag(e);
	};

	useEffect(() => {
		if (socket.current) {
			socket.current.emit('join board page');
			socket.current.on('join board page', (postits: IPostit[]) => socketApi.setUpdatedPostitList(postits));
			socket.current.on('delete postit', (postits: IPostit[]) => socketApi.setUpdatedPostitList(postits));
			socket.current.on('create new postit', (postits: IPostit) => socketApi.setUpdatedPostit(postits));
			socket.current.on('update start postit', (postit: IPostit) => socketApi.setUpdatedPostit(postit));
			socket.current.on('update end postit', (postit: IPostit) => socketApi.setUpdatedPostit(postit));
			socket.current.on('drag postit', (postit: IPostit) => socketApi.setUpdatedPostit(postit));
			socket.current.on('drag end postit', (postit: IPostit) => socketApi.setUpdatedPostit(postit));
			socket.current.on('team board error', (errorMessage: string) => toast.error(errorMessage));
		}
		return () => {
			socket.current.emit('leave board page');
			socket.current.off('join board page');
			socket.current.off('create new postit');
			socket.current.off('delete postit');
			socket.current.off('update start postit');
			socket.current.off('update end postit');
			socket.current.off('drag postit');
			socket.current.off('drag end postit');
			socket.current.off('team board error');
		};
	}, [socket.current, teamId]);

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
			socketApi={socketApi}
			showDelete={showDelete}
		/>
	);
};

export default BoardPage;
