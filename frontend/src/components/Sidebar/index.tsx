import React, { useState } from 'react';
import { FaEllipsisH, FaAngleLeft } from 'react-icons/fa';
import TeamIcon from '../Icons/TeamIcon';
import { Container, TeamTitleContainer } from './style';

const Sidebar = () => {
	const teamSelectPage = (e: any) => {
		e.preventDefault();
	};

	const openDropdown = () => {
		console.log('open dropdown');
	};

	return (
		<Container>
			<a href='/' onClick={teamSelectPage}>
				<FaAngleLeft />
				<span>모든 팀</span>
			</a>
			<TeamIcon name='bw' color='blue' />
			<TeamTitleContainer>
				<span>boostcamp web29</span>
				<FaEllipsisH onClick={openDropdown} />
			</TeamTitleContainer>
		</Container>
	);
};

export default Sidebar;
