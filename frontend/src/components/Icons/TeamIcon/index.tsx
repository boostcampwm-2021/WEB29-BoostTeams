import React from 'react';
import styled from 'styled-components';
import { ColorCode } from '../../../utils/constants';
import { ProfileImage } from './style';

interface TeamProps {
	name: string;
	color: string;
}

const TeamIcon = ({ name, color }: TeamProps) => {
	return <ProfileImage color={color}>{name}</ProfileImage>;
};

export default TeamIcon;
