import React from 'react';
// import { HeroContainer } from './index.styled.js';

import styled from 'styled-components';
import { colors, breakpts, typescales, generateStylesForSize } from '../../data/styles-data.js';
import buoyGraph from '../../images/buoy-graph.png';

export const HeroContainer = styled.div`
  background-color: ${colors.lightGreen};
  background-size: cover;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

const HeroColorCover = styled.div`
  background: url(${buoyGraph});
  opacity: 0.3;
  height: 100vh;
  width: 100%;
  position: relative;
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
    <HeroColorCover>
      <HeroTagLine>
        Buoy, Wind and Tide Data tailored for surfers
      </HeroTagLine>
    </HeroColorCover>
  </HeroContainer>
);
