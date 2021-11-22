import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '@utils/socketContext';
import BoardTemplate from '@templates/BoardTemplate';
import { toast } from 'react-toastify';

export interface PostitType {
	id: number;
	x: number;
	y: number;
	title: string;
	content: string;
	color: number;
	createdBy: number;
	createdAt: string;
	updatedBy: number;
	updatedAt: string;
}

const BoardPage: React.FC = () => {
	const [postits, setPostits] = useState<PostitType[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState('create');
	const [clickedPostit, setClickedPostit] = useState<PostitType>();
	const handleModalOpen = () => setShowModal(true);
	const handleModalClose = () => setShowModal(false);

	const socket = useContext(SocketContext);
	const socketApi = {
		createNewPostit: (newPostit: PostitType) => socket.current.emit('create new postit', newPostit),
		updatePostit: (newPostit: PostitType) => socket.current.emit('update postit', newPostit),
		initPostitState: (initPoistList: PostitType[]) => setPostits(initPoistList),
		dragPostit: (e: any) => {
			const id = e.target.id();
			const x = e.target.x();
			const y = e.target.y();
			socket.current.emit('drag postit', { id, x, y });
		},
		setPostitState: (newPostit: PostitType) => {
			setPostits((previousPostitList: PostitType[]) => {
				const postitIdx = previousPostitList.findIndex((elem) => Number(newPostit.id) === Number(elem.id));
				if (postitIdx !== -1) previousPostitList.splice(postitIdx, 1);
				return [...previousPostitList, newPostit];
			});
		},
	};

	useEffect(() => {
		if (socket.current) {
			socket.current.emit('join board page');
			socket.current.on('join board page', (postit: PostitType[]) => socketApi.initPostitState(postit));
			socket.current.on('create new postit', (postit: PostitType) => socketApi.setPostitState(postit));
			socket.current.on('update postit', (postit: PostitType) => socketApi.setPostitState(postit));
			socket.current.on('drag postit', (postit: PostitType) => socketApi.setPostitState(postit));
			socket.current.on('team board error', (message?: string) => toast.error(message));
		}
		return () => {
			socket.current.emit('leave board page');
			socket.current.off('join board page');
			socket.current.off('create new postit');
			socket.current.off('update postit');
			socket.current.off('drag postit');
			socket.current.off('team board error');
		};
	}, [socket]);

	return (
		<BoardTemplate
			postits={postits!}
			setPostits={setPostits}
			showModal={showModal}
			modalType={modalType}
			clickedPostit={clickedPostit}
			setModalType={setModalType}
			setClickedPostit={setClickedPostit}
			handleModalOpen={handleModalOpen}
			handleModalClose={handleModalClose}
			socketApi={socketApi}
		/>
	);
};

export default BoardPage;
