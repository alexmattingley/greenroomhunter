import styled from "styled-components";
import { breakpts } from "data/styles-data.js";

export const TideChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 280px;

  @media only screen and (min-width: ${breakpts.sm}) {
    height: 360px;
  }
`;
