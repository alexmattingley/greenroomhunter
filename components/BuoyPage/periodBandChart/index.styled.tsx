import styled from "styled-components";
import { CardContainer } from "components/Shared/Card/index.styled";
import { breakpts } from "@/data/styles-data";

export const ChartContainer = styled(CardContainer)`
  @media only screen and (min-width: ${breakpts.lg}) {
    width: 70%;
  }
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;
`;

export const ChartHeading = styled.h3``;

export const ChartCanvas = styled.canvas``;

export const LoadingContainer = styled.div``;
