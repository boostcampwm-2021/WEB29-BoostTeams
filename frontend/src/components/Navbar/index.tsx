import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBell, FaChalkboard, FaComments, FaCalendarDay, FaUserFriends } from 'react-icons/fa';

const SELECTED_SIDEBAR = {
  NULL: 0,
  NOTICE: 1,
  BOARD: 2,
  CHAT: 3,
  CALENDAR: 4,
  TEAM: 5,
};

const Navbar = () => {
  return (
    <Layout>
      <nav className="nav">
        <div className="nav__item">
          <FaBell className="nav__icon" />
        </div>
        <div className="nav__item tab">
          <FaChalkboard className="nav__icon" />
          <FaComments className="nav__icon" />
          <FaCalendarDay className="nav__icon" />
          <FaUserFriends className="nav__icon" />
        </div>
        <div className="nav__item">
          <TeamIcon className="nav__team-icon" />
          <TeamIcon className="nav__team-icon" />
        </div>
      </nav>
    </Layout>
  );
};

const TeamIcon = styled.div`
  width: 38px;
  height: 38px;
  background-color: #c7bfee;
  border-radius: 20%;
`;

const Layout = styled.div`
  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 68px;
    height: 100%;
    background-color: #ebebeb;
    &__item {
      display: flex;
      flex-direction: column;
      border-bottom: solid 1px #d1d1d1;
      padding: 10px 0;
    }
    &__icon {
      color: #adadad;
      width: 26px;
      height: auto;
      padding: 10px;
      cursor: pointer;
      &:hover {
        color: #6264a7;
      }
    }
    &__team-icon {
      margin: 10px 0;
      cursor: pointer;
      box-sizing: border-box;
      &:hover {
        border: solid 2px white;
      }
    }
  }

  .tab > .nav__icon {
    margin: 5px 0px;
  }
`;

export default Navbar;
