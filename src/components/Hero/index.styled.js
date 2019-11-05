import styled from 'styled-components';
import {
  colors, breakpts, generateStylesForSize, homePageSpacing,
} from 'data/styles-data.js';
import calafia from 'images/calafia.jpg';

const { itmSpacing, leftMargin } = homePageSpacing;

export const HeroContainer = styled.div`
  background-color: ${colors.lightGreen};
  position: relative;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

export const HeroBgContainer = styled.div`
  background-image: url(${calafia});
  background-size: cover;
  position: absolute;
  z-index: 0;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
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
  margin: 0 ${itmSpacing}px 50px ${itmSpacing}px;
  text-align: left;
  position: absolute;
  left: 0;
  bottom: 0;

  @media only screen and (min-width: ${breakpts.lg}) {
    margin-left: ${leftMargin}px;
    margin-bottom: 300px;
    ${generateStylesForSize('t1', 'desktop')}
  }
`;
