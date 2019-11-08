import styled from 'styled-components';
import {
  colors, breakpts, generateStylesForSize,
} from 'data/styles-data.js';

export const TideBlockContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const TideTitle = styled.h3`
  margin-top: 0;
  ${generateStylesForSize('t2', 'mobile')}

  @media only screen and (min-width: ${breakpts.md}) {
    ${generateStylesForSize('t2', 'desktop')}
  }
`;

export const TideDataContainer = styled.div`
  @media only screen and (min-width: ${breakpts.sm}) {
    display: flex;
    align-items: center;
  }
`;
