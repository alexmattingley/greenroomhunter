import styled from 'styled-components';
import {
  colors, breakpts, generateStylesForSize,
} from 'data/styles-data.js';

export const ByContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  border: solid 2px ${colors.almostWhite};
  color: ${colors.almostWhite};
  border-radius: 5px;

  @media only screen and (min-width: ${breakpts.sm}) {
    width: 35%;
  }
`;

export const ByTextTitle = styled.h2`
  margin-top: 0;
  ${generateStylesForSize('t2', 'mobile')}
`;
