import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { PostIt } from '@utils/constants';
import { PostitType } from '@pages/BoardPage';

interface Props {
	id: number;
	x: number;
	y: number;
	title: string;
	content: string;
	color: string;
	updatedDate: string;
	onDrag: (id: number, x: number, y: number) => void;
	setModalType: (type: string) => void;
	setClickedPostit: (postit: PostitType) => void;
}

const Postit: React.FC<Props> = ({
	id,
	x,
	y,
	color,
	title,
	content,
	updatedDate,
	onDrag,
	setModalType,
	setClickedPostit,
}) => {
	return (
		<Group
			postId={id}
			x={x}
			y={y}
			draggable
			onDragStart={(event) => {
				console.log('start');
			}}
			onDragMove={(event) => {
				onDrag(id, event.evt.offsetX, event.evt.offsetY);
			}}
			onDragEnd={(event) => {
				console.log('end');
			}}
		>
			<Rect width={PostIt.Length.Width} height={PostIt.Length.Height} fill={color} />
			<Group>
				<Text text={title} />
				<Text
					onClick={() => {
						setModalType('update');
						setClickedPostit({ id, title, content });
					}}
					x={PostIt.Length.Width - 20}
					text='...'
				/>
			</Group>
			<Group y={PostIt.Position.CONTENT.Y}>
				<Text text={content} width={PostIt.Length.Width} />
			</Group>
			<Group x={PostIt.Position.FOOTER.X} y={PostIt.Position.FOOTER.Y}>
				<Text text={`최근 수정 : ${updatedDate}`} />
			</Group>
		</Group>
	);
};

export default Postit;
