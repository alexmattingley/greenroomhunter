import styled from "styled-components";
import {
  breakpts,
  colors,
  generateStylesForSize,
  borderRadius,
} from "data/styles-data.js";

export const ModalContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${colors.almostBlack};
  border: 1px solid ${colors.almostWhite};
  border-radius: ${borderRadius.sm};
  padding: 24px;
  color: ${colors.almostWhite};
  outline: none;
  min-width: 300px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;

  p {
    margin: 0;
    ${generateStylesForSize("t5", "mobile")}
    @media only screen and (min-width: ${breakpts.md}) {
      ${generateStylesForSize("t5", "desktop")}
    }
  }
`;

