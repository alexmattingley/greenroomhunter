import React from 'react';
import lighthouse from 'images/lighthouse.svg';
import waves from 'images/waves.svg';
import windy from 'images/weather-windy.svg';
import tide from 'images/current-ac.svg';
import {
  SideNavContainer,
  HomeLink,
  HomeLinkText,
  PageLinkContainer,
  PageLinkTxt,
  Icon,
} from './index.styled.js';

export default function LocationSideNav(){
  return (
    <SideNavContainer>
      <HomeLink href="/">
        <Icon icon={lighthouse} width="25px" height="25px" />
        <HomeLinkText>Home</HomeLinkText>
      </HomeLink>
      <PageLinkContainer href="#buoy_block">
        <Icon icon={waves} width="25px" height="18px" />
        <PageLinkTxt>Buoys</PageLinkTxt>
      </PageLinkContainer>
      <PageLinkContainer href="#windy_block">
        <Icon icon={windy} width="25px" height="20px" />
        <PageLinkTxt>Wind</PageLinkTxt>
      </PageLinkContainer>
      <PageLinkContainer href="#tide_block">
        <Icon icon={tide} width="25px" height="20px" />
        <PageLinkTxt>Tide</PageLinkTxt>
      </PageLinkContainer>
    </SideNavContainer>
  );
}
