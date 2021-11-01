import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Chat = () => {
  return (
    <div>
      <Container>
        <Header />
        <Navbar />
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
      </Container>
    </div>
  );
};

const Container = styled.div`
  position: relative;
`;
const SidebarWrapper = styled.div`
  position: absolute;
  top: 48px;
  left: 68px;
  height: 100%;
`;
export default Chat;
