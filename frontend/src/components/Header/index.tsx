import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import ProfileIcon from './ProfileIcon';

const Layout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #464775;
  & > div > a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 24px;
  }
`;

const LogoWrapper = styled.div`
  margin: 15px;
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
        <img src="logo.png" alt="logo" width="40px" />
        <a href="/" onClick={linkHome}>
          BoostTeams
        </a>
      </LogoWrapper>
      <ProfileIcon name="부" color="purple" status="green" />
    </Layout>
  );
};

export default Header;
