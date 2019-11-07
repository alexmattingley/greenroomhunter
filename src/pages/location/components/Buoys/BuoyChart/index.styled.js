import styled from 'styled-components';
import {
  colors, breakpts, generateStylesForSize,
} from 'data/styles-data.js';

export const BuoyChartContainer = styled.div`
  padding: 20px;
  @media only screen and (min-width: ${breakpts.sm}) {
    width: 65%;
  }

`;
