import React, { useState, useEffect, useContext } from 'react';
import { useRecoilState } from 'recoil';
import postitList from '@stores/postit';
import { SocketContext } from '@utils/socketContext';
import BoardTemplate from '@templates/BoardTemplate';

export interface PostitType {
	id: number;
	title: string;
	content: string;
}

const BoardPage: React.FC = () => {
	const [postits, setPostits] = useRecoilState<any>(postitList);
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState('create');
	const [clickedPostit, setClickedPostit] = useState<PostitType>();
	const handleModalOpen = () => setShowModal(true);
	const handleModalClose = () => setShowModal(false);

	const socket = useContext(SocketContext);

	useEffect(() => {
		if (socket.current) {
			// board page 최초 입장 request
			socket.current.emit('join board page');
			socket.current.on('join board page', (postit: any) => setPostits(postit));
			// 포스트잇 생성 response ~ 포스트잇 생성 request는 modal에 위치함
			socket.current.on('create new postit', (postit: any) => setPostits(postit));
			socket.current.on('drag postit', (postit: any) => setPostits(postit));
		}
		return () => {
			socket.current.emit('leave board page');
			socket.current.off('join board page');
			socket.current.off('create new postit');
			socket.current.off('drag postit');
		};
	}, [socket]);

	return (
		<BoardTemplate
			postits={postits}
			showModal={showModal}
			modalType={modalType}
			clickedPostit={clickedPostit}
			setModalType={setModalType}
			setClickedPostit={setClickedPostit}
			handleModalOpen={handleModalOpen}
			handleModalClose={handleModalClose}
			socket={socket}
		/>
	);
};

export default BoardPage;
