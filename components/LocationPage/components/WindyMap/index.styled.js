import styled from 'styled-components';
import { breakpts, generateStylesForSize } from 'data/styles-data.js';

export const WindyChartContainer = styled.div`
  width: 100%;
  height: 400px;
`;

export const WindBlock = styled.div`
  padding: 20px 0;
`;

export const WindyTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
  ${generateStylesForSize('t2', 'mobile')}

  @media only screen and (min-width: ${breakpts.md}) {
    ${generateStylesForSize('t2', 'desktop')}
  }
`;

export const WindySubTitle = styled.h6`
  margin-top: 0;
  font-size: 16px;
  line-height: 18px;

  @media only screen and (min-width: ${breakpts.md}) {

  }
`;
