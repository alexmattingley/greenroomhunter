import styled from "styled-components";
import { breakpts } from "data/styles-data.js";

export const BuoyChartContainer = styled.div`
  @media only screen and (min-width: ${breakpts.sm}) {
    flex-grow: 1;
  }
`;
export const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
`;
