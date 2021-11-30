import React from 'react';
import useImage from 'use-image';
import { KonvaEventObject } from 'konva/lib/Node';
import { Group, Rect, Image, Text } from 'react-konva';
import { ColorCode, POSTIT, PrimaryPalette, REM } from '@utils/constants';
import { IPostit, ISocketApi } from '@src/types/board';
import { Dispatch, SetStateAction } from 'hoist-non-react-statics/node_modules/@types/react';

const PADDING = 1 * REM;
const FONT_SIZE = {
	small: 0.8 * REM,
	medium: 1 * REM,
};

type Props = {
	postit: IPostit;
	isMine: boolean;
	socketApi: ISocketApi;
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

const Title = ({ text, isUpdating }: { text: string; isUpdating: boolean }) => {
	return (
		<Text
			fontSize={FONT_SIZE.medium}
			fontStyle='bold'
			x={PADDING}
			y={PADDING}
			width={POSTIT.WIDTH - 2 * PADDING}
			height={2 * REM}
			text={isUpdating ? '수정중...' : text}
		/>
	);
};

const Content = ({ text, isUpdating, userName }: { text: string; isUpdating: boolean; userName: string }) => {
	return (
		<Text
			fontSize={FONT_SIZE.medium}
			x={PADDING}
			y={PADDING + 2 * REM}
			width={POSTIT.WIDTH - 2 * PADDING}
			height={POSTIT.HEIGHT - 2 * PADDING}
			text={isUpdating ? `${userName}님이 수정중입니다.` : text}
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
	const [pencilIcon] = useImage('/images/pencil-square.svg');
	return (
		<Image
			image={pencilIcon}
			x={POSTIT.WIDTH - 2 * PADDING}
			y={PADDING}
			width={1.3 * REM}
			height={1.3 * REM}
			opacity={0.5}
			onClick={handleUpdateModalOpen}
		/>
	);
};

const Postit: React.FC<Props> = ({
	postit,
	isMine,
	socketApi,
	getUserNameById,
	onDrag,
	onDragStart,
	onDragEnd,
	setModalType,
	setClickedPostit,
	handleModalOpen,
}) => {
	const handleUpdateModalOpen = () => {
		if (postit.whoIsUpdating === -1 && postit.whoIsDragging === -1) {
			setModalType('update');
			socketApi.updateStartPostit(postit.id);
			setClickedPostit(postit);
			handleModalOpen();
		}
	};
	return (
		<Group
			id={`${postit.id}`}
			x={postit.x * window.innerWidth}
			y={postit.y * window.innerHeight}
			onDragMove={onDrag}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			scaleX={postit.whoIsDragging !== -1 ? 1.05 : 1}
			scaleY={postit.whoIsDragging !== -1 ? 1.05 : 1}
			draggable={(postit.whoIsDragging === -1 || isMine) && postit.whoIsUpdating === -1}
			opacity={postit.whoIsUpdating !== -1 ? 0.2 : 1}
		>
			<Rect
				width={POSTIT.WIDTH}
				height={POSTIT.WIDTH}
				fill={PrimaryPalette[postit.color]}
				stroke={ColorCode.PRIMARY1}
				strokeWidth={isMine ? 1 : 0}
				shadowOffsetX={4}
				shadowOffsetY={4}
				shadowOpacity={postit.whoIsUpdating !== -1 ? 0 : 0.25}
				shadowBlur={4}
			/>
			<Title text={postit.title} isUpdating={postit.whoIsUpdating !== -1} />
			<Content
				text={postit.content}
				isUpdating={postit.whoIsUpdating !== -1}
				userName={postit.whoIsUpdating !== -1 ? getUserNameById(postit.whoIsUpdating) : ''}
			/>
			<Footer
				createdBy={getUserNameById(postit.createdBy)}
				createdAt={postit.createdAt}
				updatedBy={getUserNameById(postit.updatedBy)}
				updatedAt={postit.updatedAt}
			/>
			{postit.whoIsUpdating === -1 && <Menu handleUpdateModalOpen={handleUpdateModalOpen} />}
		</Group>
	);
};

export default Postit;
