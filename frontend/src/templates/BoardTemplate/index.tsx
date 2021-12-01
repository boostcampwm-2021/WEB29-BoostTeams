import React from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import CreatePostitModal from '@src/components/Board/Modal/Create';
import DeleteArea from '@src/components/Board/Modal/Delete';
import CreateButton from '@components/Board/CreateButton';
import { IPostit } from '@src/types/board';
import { Dispatch, SetStateAction } from 'hoist-non-react-statics/node_modules/@types/react';
import { Layout } from './style';

const Canvas = React.lazy(() => import('@components/Board/Canvas'));

interface Props {
	postits: IPostit[];
	showModal: boolean;
	showDelete: boolean;
	modalType: string;
	clickedPostit: IPostit | undefined;
	getUserNameById: (userId: number) => string;
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
	showModal,
	showDelete,
	modalType,
	clickedPostit,
	getUserNameById,
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
			<Canvas
				postits={postits}
				setModalType={setModalType}
				setClickedPostit={setClickedPostit}
				handleModalOpen={handleModalOpen}
				handleDrag={handleDrag}
				handleDragStart={handleDragStart}
				handleDragEnd={handleDragEnd}
				getUserNameById={getUserNameById}
			/>
			<CreateButton setModalType={setModalType} handleModalOpen={handleModalOpen} />
			{showModal && (
				<CreatePostitModal modalType={modalType} clickedPostit={clickedPostit} handleModalClose={handleModalClose} />
			)}
			{showDelete && <DeleteArea />}
		</Layout>
	);
};

export default BoardTemplate;
