import styled from 'styled-components';
import { breakpts, generateStylesForSize } from 'data/styles-data.js';

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

