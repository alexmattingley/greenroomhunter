import React from 'react';
import {
  SideNavContainer,
  HomeLink,
  HomeIcon,
  HomeLinkText,
} from './index.styled.js';

export default (props) => {
  return (
    <SideNavContainer>
      <HomeLink>
        <HomeIcon />
        <HomeLinkText>Home</HomeLinkText>
      </HomeLink>
    </SideNavContainer>
  );
};
