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

export const TideLayout = styled.div`
  @media only screen and (min-width: ${breakpts.md}) {
    display: flex;
    align-items: stretch;
    gap: 20px;
  }
`;

export const TideCurrentCol = styled.div`
  @media only screen and (min-width: ${breakpts.md}) {
    flex: 0 0 300px;
    display: flex;
  }
`;

export const TideCarouselCol = styled.div`
  min-width: 0;

  @media only screen and (min-width: ${breakpts.md}) {
    flex: 1;
  }
`;

