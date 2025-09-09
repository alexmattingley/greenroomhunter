import styled from 'styled-components';
import {
  colors, breakpts, generateStylesForSize, homePageSpacing,
} from 'data/styles-data.js';

const { itmSpacing, leftMargin } = homePageSpacing;

export const HeroContainer = styled.div`
  background-image: url('/images/calafia.jpg');
  background-size: cover;
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
  margin: 0 ${itmSpacing}px 150px ${itmSpacing}px;
  text-align: left;
  position: absolute;
  left: 0;
  bottom: 0;

  @media only screen and (min-width: ${breakpts.sm}) {
    margin-bottom: 250px;
  }

  @media only screen and (min-width: ${breakpts.lg}) {
    margin-left: ${leftMargin}px;
    margin-bottom: 26%;
    ${generateStylesForSize('t1', 'desktop')}
  }
`;
