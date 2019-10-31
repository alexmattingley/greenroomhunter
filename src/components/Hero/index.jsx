import React from 'react';
// import { HeroContainer } from './index.styled.js';

import styled from 'styled-components';
import { colors, breakpts, typescales, generateStylesForSize } from '../../data/styles-data.js';
import buoyGraph from '../../images/buoy-graph.png';

export const HeroContainer = styled.div`
  background-color: ${colors.lightGreen};
  position: relative;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

export const HeroBgContainer = styled.div`
  background-color: ${colors.lightGreen};
  position: absolute;
  z-index: 0;
  background-size: cover;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;


const HeroColorCover = styled.div`
  background-image: url(${buoyGraph});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  opacity: .4;
  height: 100vh;
  width: 100%;
  position: relative;

  @media only screen and (min-width: ${breakpts.lg}) {
    background-size: contain;
  }
`;

export const HeroLogo = styled.img`
  max-width: 350px;
  display: block;
  width: 85%;
  margin-right: auto;
  margin-left: auto;
`;

export const HeroTagLine = styled.h1`
  color: ${colors.almostWhite};
  ${generateStylesForSize('t1', 'mobile')}
  max-width: 564px;
  margin-top: 0;
  margin-left: 20px;
  text-align: left;
  margin-bottom: 50px;
  position: absolute;
  left: 0;
  bottom: 0;

  @media only screen and (min-width: ${breakpts.lg}) {
    margin-left: 57px;
    ${generateStylesForSize('t1', 'desktop')}
  }
`;

export default () => (
  <HeroContainer>
    <HeroBgContainer>
      <HeroColorCover />
    </HeroBgContainer>
    <HeroTagLine>
      Buoy, Wind and Tide Data tailored for surfers
    </HeroTagLine>
  </HeroContainer>
);
