import React from 'react';
import styled from 'styled-components';

const ProfileIconWrapper = styled.div`
  &:hover {
    background-color: #c7bfee;
  }
`;

const ProfileIconStyle = styled.div`
  position: relative;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color || 'white'};
`;

const StatusCircleStyle = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0;
  background-color: ${(props) => props.color || 'gray'};
  height: 15px;
  width: 15px;
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
