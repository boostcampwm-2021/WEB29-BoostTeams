import React from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { Group, Rect, Text } from 'react-konva';
import { ColorCode, POSTIT, PrimaryPalette, REM } from '@src/utils/constants';
import { IPostit } from '@src/types/board';
import { Dispatch, SetStateAction } from 'hoist-non-react-statics/node_modules/@types/react';

const PADDING = 1 * REM;
const FONT_SIZE = {
	small: 0.8 * REM,
	medium: 1 * REM,
};

type Props = {
	postit: IPostit;
	getUserNameById: (userId: number) => string;
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
			fontSize={FONT_SIZE.medium}
			fontStyle='bold'
			x={PADDING}
			y={PADDING}
			width={POSTIT.WIDTH - 2 * PADDING}
			height={2 * REM}
			text={text}
		/>
	);
};

const Content = ({ text }: { text: string }) => {
	return (
		<Text
			fontSize={FONT_SIZE.medium}
			x={PADDING}
			y={PADDING + 2 * REM}
			width={POSTIT.WIDTH - 2 * PADDING}
			height={POSTIT.HEIGHT - 2 * PADDING}
			text={text}
		/>
	);
};

const Footer = ({ createdBy, createdAt, updatedBy, updatedAt }: { [key: string]: string }) => {
	return (
		<Group y={POSTIT.WIDTH - 2 * FONT_SIZE.small - 0.5 * PADDING}>
			<Text
				fontSize={FONT_SIZE.small}
				width={POSTIT.WIDTH - 0.5 * PADDING}
				height={FONT_SIZE.small}
				fill={ColorCode.GRAY}
				wrap='none'
				align='right'
				text={`작성자 ${createdBy} | ${onlyDate(createdAt)}`}
			/>
			<Text
				fontSize={FONT_SIZE.small}
				width={POSTIT.WIDTH - 0.5 * PADDING}
				height={FONT_SIZE.small}
				y={FONT_SIZE.small}
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
			width={POSTIT.WIDTH - 2 * PADDING}
			align='right'
			onClick={handleUpdateModalOpen}
		/>
	);
};

const Postit: React.FC<Props> = ({
	postit,
	getUserNameById,
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
			x={postit.x * window.innerWidth}
			y={postit.y * window.innerHeight}
			onDragMove={onDrag}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			draggable
		>
			<Rect
				width={POSTIT.WIDTH}
				height={POSTIT.WIDTH}
				fill={PrimaryPalette[postit.color]}
				shadowOffsetX={4}
				shadowOffsetY={4}
				shadowOpacity={0.25}
				shadowBlur={4}
			/>
			<Title text={postit.title} />
			<Content text={postit.content} />
			<Footer
				createdBy={getUserNameById(postit.createdBy)}
				createdAt={postit.createdAt}
				updatedBy={getUserNameById(postit.updatedBy)}
				updatedAt={postit.updatedAt}
			/>
			<Menu handleUpdateModalOpen={handleUpdateModalOpen} />
		</Group>
	);
};

export default Postit;
