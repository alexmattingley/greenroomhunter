import styled from "@emotion/styled";
import { colors, breakpts } from "data/styles-data";

export const PageContainer = styled.div`
  height: 100%;
  background-color: ${colors.almostBlack};
  color: ${colors.almostWhite};
  padding: 20px;
`;

export const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const BandContainer = styled.div`
  @media only screen and (min-width: ${breakpts.lg}) {
    display: flex;
    gap: 20px;
  }
`;
