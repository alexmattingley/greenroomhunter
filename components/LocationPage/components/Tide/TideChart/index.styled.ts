import styled from "styled-components";
import { breakpts } from "data/styles-data.js";

export const TideChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  /* While a finger is scrubbing the chart, drive the chart instead of
     scrolling the page vertically. */
  touch-action: none;

  canvas {
    touch-action: none;
  }

  @media only screen and (min-width: ${breakpts.sm}) {
    height: 360px;
  }
`;
