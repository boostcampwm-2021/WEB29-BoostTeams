import React from 'react';
import { Stage, Layer } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useRecoilValue } from 'recoil';
import userState from '@src/stores/user';
import { CANVAS } from '@utils/constants';
import { IPostit, ISocketApi } from '@src/types/board';
import { Dispatch, SetStateAction } from 'hoist-non-react-statics/node_modules/@types/react';
import Postit from '../Postit';

interface Props {
	postits: IPostit[];
	socketApi: ISocketApi;
	getUserNameById: (userId: number) => string;
	handleDrag: (e: KonvaEventObject<DragEvent>) => void;
	handleDragStart: (e: KonvaEventObject<DragEvent>) => void;
	handleDragEnd: (e: KonvaEventObject<DragEvent>) => void;
	setModalType: Dispatch<SetStateAction<string>>;
	setClickedPostit: (postit: IPostit) => void;
	handleModalOpen: () => void;
}

const Canvas: React.FC<Props> = ({
	postits,
	socketApi,
	getUserNameById,
	handleDrag,
	handleDragStart,
	handleDragEnd,
	setModalType,
	setClickedPostit,
	handleModalOpen,
}) => {
	const userId = useRecoilValue(userState).id;
	return (
		<Stage width={CANVAS.WIDTH} height={CANVAS.HEIGHT}>
			<Layer>
				{postits &&
					postits.map((postit) => (
						<Postit
							key={postit.id}
							postit={postit}
							socketApi={socketApi}
							isMine={userId === postit.whoIsDragging}
							onDrag={handleDrag}
							onDragStart={handleDragStart}
							onDragEnd={handleDragEnd}
							setModalType={setModalType}
							setClickedPostit={setClickedPostit}
							handleModalOpen={handleModalOpen}
							getUserNameById={getUserNameById}
						/>
					))}
			</Layer>
		</Stage>
	);
};

export default Canvas;
