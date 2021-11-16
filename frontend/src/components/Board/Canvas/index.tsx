import React, { useState, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import { CANVAS } from '@utils/constants';
import Postit from '../Postit';

const Canvas: React.FC = () => {
	return (
		<Stage width={CANVAS.WITDH} height={CANVAS.HEIGHT}>
			<Layer>
				{dummy.map((postit) => (
					<Postit
						key={postit.key}
						id={postit.key}
						x={postit.x}
						y={postit.y}
						color={postit.color}
						title={postit.title}
						content={postit.content}
						updatedDate={postit.updatedDate}
					/>
				))}
			</Layer>
		</Stage>
	);
};
// { id, x, y, color, title, content, updatedDate }
export default Canvas;

const dummy = [
	{
		key: 1,
		title: 'title#1',
		content:
			'desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1desc#1',
		x: 10,
		y: 10,
		color: 'red',
		updatedDate: '2021.07.02.',
	},
	{
		key: 2,
		title: 'title#2',
		content: 'desc#2',
		x: 100,
		y: 100,
		color: 'blue',
		updatedDate: '2021.07.02.',
	},
	{
		key: 3,
		title: 'title#3',
		content: 'desc#3',
		x: 200,
		y: 200,
		color: 'green',
		updatedDate: '2021.07.02.',
	},
];
