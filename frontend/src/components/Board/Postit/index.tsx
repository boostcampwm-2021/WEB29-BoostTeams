import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { PostIt } from '@utils/constants';

interface Props {
	id: number;
	x: number;
	y: number;
	title: string;
	content: string;
	color: string;
	updatedDate: string;
}

const Postit: React.FC<Props> = ({ id, x, y, color, title, content, updatedDate }) => {
	return (
		<Group postId={id} x={x} y={y} draggable>
			<Rect width={PostIt.Length.Width} height={PostIt.Length.Height} fill={color} />
			<Group>
				<Text text={title} />
				<Text x={PostIt.Length.Width - 20} text='...' />
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
