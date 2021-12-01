import React, { Dispatch, SetStateAction, useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { Stage, Layer } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import userState from '@stores/user';
import { CANVAS } from '@utils/constants';
import { SocketContext } from '@utils/socketContext';
import { IPostit } from '@src/types/board';
import Postit from '../Postit';

interface Props {
	postits: IPostit[];
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
	getUserNameById,
	handleDrag,
	handleDragStart,
	handleDragEnd,
	setModalType,
	setClickedPostit,
	handleModalOpen,
}) => {
	const userId = useRecoilValue(userState).id;
	const socket = useContext(SocketContext).current;
	return (
		<Stage width={CANVAS.WIDTH} height={CANVAS.HEIGHT}>
			<Layer>
				{postits &&
					postits.map((postit) => (
						<Postit
							key={postit.id}
							postit={postit}
							socket={socket}
							userId={userId}
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
