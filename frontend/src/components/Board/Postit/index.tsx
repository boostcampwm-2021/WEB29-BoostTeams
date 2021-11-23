import React from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { Group, Rect, Text } from 'react-konva';
import { ColorCode, PrimaryPalette, REM } from '@src/utils/constants';
import { IPostit } from '@src/types/board';
import { Dispatch, SetStateAction } from 'hoist-non-react-statics/node_modules/@types/react';

const POSTIT_WIDTH = 16 * REM;
const PADDING = 1 * REM;

type Props = {
	postit: IPostit;
	onDrag: (e: KonvaEventObject<DragEvent>) => void;
	onDragStart: (e: KonvaEventObject<DragEvent>) => void;
	onDragEnd: (e: KonvaEventObject<DragEvent>) => void;
	setModalType: Dispatch<SetStateAction<string>>;
	setClickedPostit: (postit: IPostit) => void;
	handleModalOpen: () => void;
};

const onlyDate = (date: string) => {
	const DateObj = new Date(date);
	return `${DateObj.getFullYear()}. ${DateObj.getMonth() + 1}. ${DateObj.getDate()}`;
};

const Title = ({ text }: { text: string }) => {
	return (
		<Text
			fontSize={1 * REM}
			fontStyle='bold'
			x={PADDING}
			y={PADDING}
			width={POSTIT_WIDTH - 2 * PADDING}
			height={2 * REM}
			text={text}
		/>
	);
};

const Content = ({ text }: { text: string }) => {
	return (
		<Text
			fontSize={1 * REM}
			x={PADDING}
			y={PADDING + 2 * REM}
			width={POSTIT_WIDTH - 2 * PADDING}
			height={POSTIT_WIDTH - 2 * PADDING}
			text={text}
		/>
	);
};

const Footer = ({ createdBy, createdAt, updatedBy, updatedAt }: { [key: string]: string }) => {
	return (
		<Group y={POSTIT_WIDTH - 2 * 0.8 * REM - 0.5 * PADDING}>
			<Text
				fontSize={0.8 * REM}
				width={POSTIT_WIDTH - 0.5 * PADDING}
				height={0.8 * REM}
				fill={ColorCode.GRAY}
				wrap='none'
				align='right'
				text={`작성자 ${createdBy} | ${onlyDate(createdAt)}`}
			/>
			<Text
				fontSize={0.8 * REM}
				width={POSTIT_WIDTH - 0.5 * PADDING}
				height={0.8 * REM}
				y={0.8 * REM}
				fill={ColorCode.GRAY}
				wrap='none'
				align='right'
				text={`최근 수정 ${updatedBy} | ${onlyDate(updatedAt)}`}
			/>
		</Group>
	);
};

const Menu = ({ handleUpdateModalOpen }: { handleUpdateModalOpen: () => void }) => {
	return (
		<Text
			text='...'
			fontSize={1.5 * REM}
			x={PADDING}
			width={POSTIT_WIDTH - 2 * PADDING}
			align='right'
			onClick={handleUpdateModalOpen}
		/>
	);
};

const Postit: React.FC<Props> = ({
	postit,
	onDrag,
	onDragStart,
	onDragEnd,
	setModalType,
	setClickedPostit,
	handleModalOpen,
}) => {
	const handleUpdateModalOpen = () => {
		setModalType('update');
		setClickedPostit(postit);
		handleModalOpen();
	};
	return (
		<Group
			id={`${postit.id}`}
			x={postit.x}
			y={postit.y}
			onDragMove={onDrag}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			draggable
		>
			<Rect
				width={POSTIT_WIDTH}
				height={POSTIT_WIDTH}
				fill={PrimaryPalette[postit.color]}
				shadowOffsetX={4}
				shadowOffsetY={4}
				shadowOpacity={0.25}
				shadowBlur={4}
			/>
			<Title text={postit.title} />
			<Content text={postit.content} />
			<Footer
				createdBy={postit.createdBy.toString()}
				createdAt={postit.createdAt}
				updatedBy={postit.updatedBy.toString()}
				updatedAt={postit.updatedAt}
			/>
			<Menu handleUpdateModalOpen={handleUpdateModalOpen} />
		</Group>
	);
};

export default Postit;
