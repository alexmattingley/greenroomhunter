import styled from 'styled-components';
import {
  colors, breakpts, generateStylesForSize,
} from 'data/styles-data.js';

export const TideTableTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  ${generateStylesForSize('t2', 'mobile')}

  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize('t2', 'desktop')}
  }
`;

export const TideTableContainer = styled.div`
  padding: 20px 0;

  @media only screen and (min-width: ${breakpts.sm}) {
    padding: 0;
    min-width: 340px;
    order: 1;
  }

  @media only screen and (min-width: ${breakpts.lg}) {
    min-width: 415px;
  }
`;

export const TideTableRow = styled.div`
  ${generateStylesForSize('t5', 'mobile')}
  margin: 10px 0;
  ${(props) => {
    const { point } = props;
    return point === 'High' ? `color: ${colors.gray}` : `color: ${colors.almostWhite};`;
  }}

  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize('t5', 'desktop')}
  }
`;
