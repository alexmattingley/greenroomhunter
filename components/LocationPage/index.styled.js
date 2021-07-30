import styled from 'styled-components';
import {
  colors, breakpts, generateStylesForSize,
} from 'data/styles-data.js';

export const LocationContent = styled.div`
  background-color: ${colors.almostBlack};
  color: ${colors.almostWhite};
  padding: 20px;

  @media only screen and (min-width: ${breakpts.md}) {
    position: absolute;
    min-height: 100%;
    height: auto;
    left: 20%;
    width: 80%;
  }
`;

export const LocationHeader = styled.h1`
  margin-top: 0;
  margin-bottom: 20px;
  ${generateStylesForSize('t1', 'mobile')}
`;
