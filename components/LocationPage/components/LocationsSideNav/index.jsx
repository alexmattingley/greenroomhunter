import React from 'react';
import {
  SideNavContainer,
  HomeLink,
  HomeLinkText,
  PageLinkContainer,
  PageLinkTxt,
  Icon,
} from './index.styled.js';

export default function LocationSideNav() {
  return (
    <SideNavContainer>
      <HomeLink href="/">
        <Icon icon="/images/lighthouse.svg" width="25px" height="25px" />
        <HomeLinkText>Home</HomeLinkText>
      </HomeLink>
      <PageLinkContainer href="#buoy_block">
        <Icon icon="/images/waves.svg" width="25px" height="18px" />
        <PageLinkTxt>Buoys</PageLinkTxt>
      </PageLinkContainer>
      <PageLinkContainer href="#windy_block">
        <Icon icon="/images/weather-windy.svg" width="25px" height="20px" />
        <PageLinkTxt>Wind</PageLinkTxt>
      </PageLinkContainer>
      <PageLinkContainer href="#tide_block">
        <Icon icon="/images/current-ac.svg" width="25px" height="20px" />
        <PageLinkTxt>Tide</PageLinkTxt>
      </PageLinkContainer>
    </SideNavContainer>
  );
}
