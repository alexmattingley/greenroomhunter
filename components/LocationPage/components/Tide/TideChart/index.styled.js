import styled from 'styled-components';
import {
  colors, breakpts, generateStylesForSize,
} from 'data/styles-data.js';

export const TideChartContainer = styled.div`
  @media only screen and (min-width: ${breakpts.sm}) {
    flex-grow: 1;
    order: 2;
  }
`;
