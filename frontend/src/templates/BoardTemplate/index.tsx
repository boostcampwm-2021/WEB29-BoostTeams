import React from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { Header, Navbar } from '@components/common';
import Canvas from '@components/Board/Canvas';
import CreatePostItModal from '@components/Board/Modal';
import CreateButton from '@components/Board/CreateButton';
import { IPostit, ISocketApi } from '@src/types/board';
import { Dispatch, SetStateAction } from 'hoist-non-react-statics/node_modules/@types/react';
import { Layout, MainContainer } from './style';

interface Props {
	postits: IPostit[];
	socketApi: ISocketApi;
	showModal: boolean;
	modalType: string;
	clickedPostit: IPostit | undefined;
	setClickedPostit: (postit: IPostit) => void;
	setModalType: Dispatch<SetStateAction<string>>;
	handleModalOpen: () => void;
	handleModalClose: () => void;
	handleDrag: (e: KonvaEventObject<DragEvent>) => void;
	handleDragStart: (e: KonvaEventObject<DragEvent>) => void;
	handleDragEnd: (e: KonvaEventObject<DragEvent>) => void;
}

const BoardTemplate: React.FC<Props> = ({
	postits,
	socketApi,
	showModal,
	modalType,
	clickedPostit,
	setModalType,
	setClickedPostit,
	handleModalOpen,
	handleModalClose,
	handleDrag,
	handleDragStart,
	handleDragEnd,
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
					handleDrag={handleDrag}
					handleDragStart={handleDragStart}
					handleDragEnd={handleDragEnd}
				/>
			</MainContainer>
			<CreateButton setModalType={setModalType} handleModalOpen={handleModalOpen} />
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
