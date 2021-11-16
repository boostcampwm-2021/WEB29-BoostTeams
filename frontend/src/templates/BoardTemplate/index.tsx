import React from 'react';
import { Header, Navbar } from '@components/common';
import Canvas from '@components/Board/Canvas';
import CreatePostItModal from '@components/Board/Modal';
import { PostitType } from '@pages/BoardPage';
import { Layout, MainContainer } from './style';

interface Props {
	postits: any[];
	socket: any;
	showModal: boolean;
	modalType: string;
	clickedPostit: any;
	setClickedPostit: (postit: PostitType) => void;
	setModalType: (type: string) => void;
	handleModalOpen: () => void;
	handleModalClose: () => void;
}

const BoardTemplate: React.FC<Props> = ({
	postits,
	socket,
	showModal,
	modalType,
	clickedPostit,
	setModalType,
	setClickedPostit,
	handleModalOpen,
	handleModalClose,
}) => {
	return (
		<Layout>
			<Header />
			<MainContainer>
				<Navbar />
				<Canvas
					postits={postits}
					setModalType={setModalType}
					setClickedPostit={setClickedPostit}
					handleModalOpen={handleModalOpen}
				/>
			</MainContainer>
			{showModal && (
				<CreatePostItModal
					socket={socket}
					modalType={modalType}
					clickedPostit={clickedPostit}
					handleModalClose={handleModalClose}
				/>
			)}
		</Layout>
	);
};

export default BoardTemplate;
