import React from 'react';
import { Header, Navbar } from '@components/common';
import Canvas from '@components/Board/Canvas';
import CreatePostItModal from '@components/Board/Modal';
import { PostitType } from '@pages/BoardPage';
import { Layout, MainContainer } from './style';

interface Props {
	postits: PostitType[];
	socketApi: any;
	showModal: boolean;
	modalType: string;
	clickedPostit: any;
	setPostits: any;
	setClickedPostit: (postit: PostitType) => void;
	setModalType: (type: string) => void;
	handleModalOpen: () => void;
	handleModalClose: () => void;
}

const BoardTemplate: React.FC<Props> = ({
	postits,
	socketApi,
	showModal,
	modalType,
	clickedPostit,
	setPostits,
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
					socketApi={socketApi}
					setPostits={setPostits}
					setModalType={setModalType}
					setClickedPostit={setClickedPostit}
					handleModalOpen={handleModalOpen}
				/>
			</MainContainer>
			{showModal && (
				<CreatePostItModal
					socketApi={socketApi}
					modalType={modalType}
					clickedPostit={clickedPostit}
					handleModalClose={handleModalClose}
				/>
			)}
		</Layout>
	);
};

export default BoardTemplate;
