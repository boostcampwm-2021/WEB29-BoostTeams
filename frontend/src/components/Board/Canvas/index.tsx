import React from 'react';
import { Stage, Layer } from 'react-konva';
import UserState from '@stores/user';
import { PostitType } from '@pages/BoardPage';
import { PrimaryPalette, REM } from '@utils/constants';
import Postit from '../Postit';

interface Props {
	postits: any[];
	socketApi: any;
	setPostits: (postit: PostitType[]) => void;
	setModalType: (type: string) => void;
	setClickedPostit: (postit: PostitType) => void;
	handleModalOpen: () => void;
}

const Canvas: React.FC<Props> = ({
	postits,
	socketApi,
	setPostits,
	setModalType,
	setClickedPostit,
	handleModalOpen,
}) => {
	const handleDragStart = (e: any) => {
		const id = Number(e.target.id());
		const postitList = [...postits];
		const postitIdx = postitList.findIndex((postit) => postit.id === id);
		const postit = { ...postitList.splice(postitIdx, 1)[0], isDragging: true };
		postitList.push(postit);
		setPostits(postitList);
	};

	const handleDragEnd = (e: any) => {
		const id = Number(e.target.id());
		const postitList = [...postits];
		const postitIdx = postitList.findIndex((postit) => postit.id === id);
		postitList[postitIdx] = {
			...postitList[postitIdx],
			x: e.target.x(),
			y: e.target.y(),
			isDragging: false,
		};
		setPostits(postitList);
	};

	const handleDrag = (event: any) => {
		console.log(event);
		socketApi.dragPostit(event);
	};

	return (
		<Stage width={window.innerWidth - 4.2 * REM} height={window.innerHeight - 3 * REM}>
			<Layer>
				{postits.map((postit) => (
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

/*
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
*/
