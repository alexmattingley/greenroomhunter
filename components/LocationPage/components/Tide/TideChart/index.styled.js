import styled from "styled-components";
import { breakpts, colors, borderRadius } from "data/styles-data.js";

const TideChartContainer = styled.div`
  background: ${colors.almostTransparentGray};
  padding: 10px;
  border-radius: ${borderRadius.sm};
  @media only screen and (min-width: ${breakpts.sm}) {
    flex-grow: 1;
    order: 1;
    display: flex;
    align-items: center;
  }
  @media only screen and (min-width: ${breakpts.xxl}) {
    order: 2;
  }
`;

export default TideChartContainer;
