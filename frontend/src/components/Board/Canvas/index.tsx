import React from 'react';
import { Stage, Layer } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { CANVAS } from '@utils/constants';
import { IPostit } from '@src/types/board';
import { Dispatch, SetStateAction } from 'hoist-non-react-statics/node_modules/@types/react';
import Postit from '../Postit';

interface Props {
	postits: IPostit[];
	handleDrag: (e: KonvaEventObject<DragEvent>) => void;
	handleDragStart: (e: KonvaEventObject<DragEvent>) => void;
	handleDragEnd: (e: KonvaEventObject<DragEvent>) => void;
	setModalType: Dispatch<SetStateAction<string>>;
	setClickedPostit: (postit: IPostit) => void;
	handleModalOpen: () => void;
}

const Canvas: React.FC<Props> = ({
	postits,
	handleDrag,
	handleDragStart,
	handleDragEnd,
	setModalType,
	setClickedPostit,
	handleModalOpen,
}) => {
	return (
		<Stage width={CANVAS.WIDTH} height={CANVAS.HEIGHT}>
			<Layer>
				{postits &&
					postits.map((postit) => (
						<Postit
							key={postit.id}
							postit={postit}
							onDrag={handleDrag}
							onDragStart={handleDragStart}
							onDragEnd={handleDragEnd}
							setModalType={setModalType}
							setClickedPostit={setClickedPostit}
							handleModalOpen={handleModalOpen}
						/>
					))}
			</Layer>
		</Stage>
	);
};

export default Canvas;
