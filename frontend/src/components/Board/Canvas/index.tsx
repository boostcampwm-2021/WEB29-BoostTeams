import React, { useContext } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import { CANVAS } from '@utils/constants';
import { PostitType } from '@pages/BoardPage';
import { SocketContext } from '@utils/socketContext';
import Postit from '../Postit';

interface Props {
	postits: any[];
	setModalType: (type: string) => void;
	setClickedPostit: (postit: PostitType) => void;
	handleModalOpen: () => void;
}

const Canvas: React.FC<Props> = ({ postits, setModalType, setClickedPostit, handleModalOpen }) => {
	const socket = useContext(SocketContext);
	const dragPostit = (id: number, x: number, y: number) => socket.current.emit('drag postit', { id, x, y });

	return (
		<Stage width={CANVAS.WITDH} height={CANVAS.HEIGHT}>
			<Layer>
				<Text
					onClick={() => {
						setModalType('create');
						handleModalOpen();
					}}
					text='새 포스트잇 작성'
				/>
				{postits.map((postit) => (
					<Postit
						onDrag={dragPostit}
						key={postit.key}
						id={postit.key}
						x={postit.x}
						y={postit.y}
						color={postit.color}
						title={postit.title}
						content={postit.content}
						updatedDate={postit.updatedDate}
						setModalType={setModalType}
						setClickedPostit={setClickedPostit}
					/>
				))}
			</Layer>
		</Stage>
	);
};
export default Canvas;
