import styled from "styled-components";
import { colors, breakpts, generateStylesForSize } from "data/styles-data.js";

export const TideTableWrapper = styled.div`
  width: 100%;
`;

export const TideTableRow = styled.div`
  ${generateStylesForSize("t5", "mobile")}
  border-bottom: 1px solid ${colors.almostWhite};
  padding: 10px 5px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  width: 100%;
  align-items: center;
  justify-items: center;
  ${({ nextTide }) => {
    return nextTide
      ? `background-color: ${colors.almostBlack}; color: ${colors.lightGreen};`
      : `color: ${colors.almostWhite};`;
  }}

  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize("t5", "desktop")}
  }
`;
