import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEllipsisH, FaAngleLeft } from 'react-icons/fa';

const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: purple;
  border-radius: 8px;
  width: 60px;
  height: 60px;
`;

const Layout = styled.nav`
  background-color: #f0f0f0;
  width: 300px;
  height: 100vh;
  padding: 20px 10px;
  box-sizing: border-box;
  text-align: left;
  & > * {
    text-decoration: none;
    color: black;
  }
`;

const TeamTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Sidebar = () => {
  const teamSelectPage = (e: any) => {
    e.preventDefault();
  };

  const openDropdown = () => {
    console.log('open dropdown');
  };

  return (
    <Layout>
      <a href="/" onClick={teamSelectPage}>
        <FaAngleLeft />
        모든 팀
      </a>
      <ProfileImage>bw</ProfileImage>
      <TeamTitleContainer>
        <span>boostcamp web29</span>
        <FaEllipsisH onClick={openDropdown} />
      </TeamTitleContainer>
    </Layout>
  );
};

export default Sidebar;
