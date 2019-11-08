import styled from 'styled-components';
import {
  colors, breakpts, generateStylesForSize,
} from 'data/styles-data.js';

export const ByContainer = styled.div`
  margin: 20px 0;
  padding-top: 20px;
  padding-bottom: 20px;
  color: ${colors.almostWhite};
  border-radius: 5px;

  @media only screen and (min-width: ${breakpts.sm}) {
    margin: 0;
    width: 290px;
  }

  @media only screen and (min-width: ${breakpts.lg}) {
    width: 320px;
  }

  @media only screen and (min-width: ${breakpts.xl}) {
    width: 370px;
  }
`;

export const ByTextTitle = styled.h2`
  margin-top: 0;
  ${generateStylesForSize('t2', 'mobile')}

  @media only screen and (min-width: ${breakpts.md}) {
    ${generateStylesForSize('t2', 'desktop')}
  }
`;

export const ByDefaultP = styled.p`
  margin-top: 0;
  margin-bottom: 10px;
  ${generateStylesForSize('t5', 'mobile')}

  @media only screen and (min-width: ${breakpts.md}) {
    ${generateStylesForSize('t5', 'desktop')}
  }
`;
