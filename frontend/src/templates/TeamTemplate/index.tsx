import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Header, Navbar } from '../../components/common';
import UserState from '../../stores/user';

const Team: React.FC = () => {
	const user = useRecoilValue(UserState);
	console.dir(user);
	return (
		<>
			<Header />
			<Navbar />
		</>
	);
};
export default Team;
