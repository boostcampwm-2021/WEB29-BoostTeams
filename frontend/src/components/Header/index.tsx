import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import ProfileIcon from './ProfileIcon';

const Layout = styled.header`
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #464775;
  padding: 0 15px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  img {
    padding-right: 10px;
  }
  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 22px;
  }
`;

const Header = () => {
  const history = useHistory();

  const linkHome = (e: any) => {
    e.preventDefault();
    // history.push('/');
  };

  return (
    <Layout>
      <LogoWrapper>
        <img src="logo.png" alt="logo" width="32px" />
        <a href="/" onClick={linkHome}>
          BoostTeams
        </a>
      </LogoWrapper>
      <ProfileIcon name="부" color="orange" status="green" />
    </Layout>
  );
};

export default Header;
