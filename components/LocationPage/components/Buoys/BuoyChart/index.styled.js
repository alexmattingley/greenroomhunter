import styled from "styled-components";
import { breakpts, colors, generateStylesForSize } from "data/styles-data.js";

export const BuoyChartContainer = styled.div`
  @media only screen and (min-width: ${breakpts.sm}) {
    flex-grow: 1;
  }
`;
export const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;
`;

export const ChartTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 10px;
  padding-bottom: 5px;
  display: inline-block;
  ${generateStylesForSize("t5", "mobile")}

  @media only screen and (min-width: ${breakpts.md}) {
    ${generateStylesForSize("t5", "desktop")}
  }
`;
