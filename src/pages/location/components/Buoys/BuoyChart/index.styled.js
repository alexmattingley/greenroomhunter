import styled from 'styled-components';
import {
  colors, breakpts, generateStylesForSize,
} from 'data/styles-data.js';

export const BuoyChartContainer = styled.div`

  @media only screen and (min-width: ${breakpts.sm}) {
    padding: 20px;
    width: 65%;
  }

  @media only screen and (min-width: ${breakpts.xl}) {
    width: 75%;
  }

`;
