import styled from 'styled-components';
import {
  colors, breakpts, generateStylesForSize,
} from 'data/styles-data.js';
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
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;


export const HeroColorCover = styled.div`
  background-image: url(${buoyGraph});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  opacity: 0.4;
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
  margin: 0 20px 50px 20px;
  text-align: left;
  position: absolute;
  left: 0;
  bottom: 0;

  @media only screen and (min-width: ${breakpts.lg}) {
    margin-left: 57px;
    ${generateStylesForSize('t1', 'desktop')}
  }
`;
