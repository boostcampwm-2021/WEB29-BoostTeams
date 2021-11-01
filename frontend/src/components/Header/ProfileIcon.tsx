import React from 'react';
import styled from 'styled-components';

const ProfileIconWrapper = styled.div`
  &:hover {
    background-color: #c7bfee;
  }
`;

const ProfileIconStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background-color: ${(props) => props.color || 'white'};
`;

const StatusCircleStyle = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.color || 'gray'};
  height: 10px;
  width: 10px;
  border-radius: 50%;
`;

interface ProfileProps {
  name: string;
  color: string;
  status: string;
}

const ProfileIcon = ({ name, color, status }: ProfileProps) => {
  return (
    <ProfileIconWrapper>
      <ProfileIconStyle color={color}>
        {name}
        <StatusCircleStyle color={status} />
      </ProfileIconStyle>
    </ProfileIconWrapper>
  );
};

export default ProfileIcon;
