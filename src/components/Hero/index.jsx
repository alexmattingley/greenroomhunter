import React from 'react';
import {
  HeroContainer, HeroBgContainer, HeroColorCover, HeroTagLine
} from './index.styled.js';


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
