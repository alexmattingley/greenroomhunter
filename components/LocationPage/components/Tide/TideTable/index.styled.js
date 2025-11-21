import styled from "styled-components";
import { colors, breakpts, generateStylesForSize } from "data/styles-data.js";
import { CardContainer } from "components/Shared/Card/index.styled";

export const HighAndLowTideCard = styled(CardContainer)`
  @media only screen and (min-width: ${breakpts.xl}) {
    margin-bottom: 0;
  }
`;

export const CurrentTideText = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-weight: bold;
  ${generateStylesForSize("t2", "mobile")}
  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize("t2", "desktop")}
  }
`;

export const NextTideDescription = styled.div`
  ${generateStylesForSize("t4", "mobile")}

  b {
    color: ${colors.lightGreen};
  }

  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize("t4", "desktop")}
  }
`;

export const CurrentTideTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  ${generateStylesForSize("t2", "mobile")}

  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize("t2", "desktop")}
  }
`;

export const TideTableTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  ${generateStylesForSize("t2", "mobile")}

  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize("t2", "desktop")}
  }
`;

export const TideTableContainer = styled.div`
  @media only screen and (min-width: ${breakpts.sm}) {
    padding: 0;
    min-width: 340px;
    order: 2;
  }

  @media only screen and (min-width: ${breakpts.lg}) {
    display: flex;
    gap: 20px;
  }
  @media only screen and (min-width: ${breakpts.xl}) {
    display: block;
    order: 1;
    min-width: 30%;
  }
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
