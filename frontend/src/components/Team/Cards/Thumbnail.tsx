import React from 'react';
import { ThumbnailWrapper } from './style';

type Props = {
	team_id: number;
	team_name: string;
};

const Thumbnail: React.FC<Props> = ({ team_id, team_name }) => {
	const shortenName = team_name?.slice(0, 1).toUpperCase();
	return (
		<ThumbnailWrapper team_id={team_id}>
			<span>{shortenName}</span>
		</ThumbnailWrapper>
	);
};

export default Thumbnail;
