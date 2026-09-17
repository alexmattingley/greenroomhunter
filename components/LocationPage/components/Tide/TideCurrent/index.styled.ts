import styled from "styled-components";
import { colors, breakpts, generateStylesForSize } from "data/styles-data.js";
import { CardContainer } from "components/Shared/Card/index.styled";

export const CardTextContainer = styled(CardContainer)`
  margin-bottom: 20px;
`;

export const CurrentTideTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  ${generateStylesForSize("t2", "mobile")}

  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize("t2", "desktop")}
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
  ${generateStylesForSize("t5", "mobile")}

  b {
    color: ${colors.lightGreen};
  }

  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize("t5", "desktop")}
  }
`;
