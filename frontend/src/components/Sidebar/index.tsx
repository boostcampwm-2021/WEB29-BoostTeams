import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEllipsisH, FaAngleLeft } from 'react-icons/fa';

const ProfileImage = styled.div`
  background-color: purple;
  border-radius: 8px;
  width: 60px;
  height: 60px;
  color: white;
`;

const Layout = styled.nav`
  background-color: #ebebeb;
  width: 300px;
  height: 100%;
  & > * {
    text-decoration: none;
    color: black;
  }
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
      <section>
        <span>boostcamp web29</span>
        <FaEllipsisH onClick={openDropdown} />
      </section>
    </Layout>
  );
};

export default Sidebar;
