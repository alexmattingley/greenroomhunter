import styled from "styled-components";
import {
  colors,
  breakpts,
  generateStylesForSize,
  borderRadius,
} from "data/styles-data.js";

export const ByContainer = styled.div`
  margin: 20px 0;
  color: ${colors.almostWhite};

  @media only screen and (min-width: ${breakpts.sm}) {
    display: flex;
    margin: 0;
    width: 290px;
  }

  @media only screen and (min-width: ${breakpts.lg}) {
    width: 320px;
  }

  @media only screen and (min-width: ${breakpts.xl}) {
    width: 420px;
  }
`;

export const LastUpdated = styled.div`
  margin-bottom: 20px;
`;
export const ByDefaultH4 = styled.h4`
  margin-top: 0;
  margin-bottom: 10px;
  padding-bottom: 5px;
  display: inline-block;
  ${generateStylesForSize("t5", "mobile")}
  border-bottom: 1px solid ${colors.almostWhite};

  @media only screen and (min-width: ${breakpts.md}) {
    ${generateStylesForSize("t5", "desktop")}
  }
`;

export const SwellSpectraBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border: 1px solid ${colors.almostWhite};
  border-radius: ${borderRadius.xs};
  background: none;
  padding: 10px;
  color: ${colors.almostWhite};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
  ${generateStylesForSize("t5", "mobile")}
  &:hover {
    color: ${colors.greenTintedWhite};
    border-color: ${colors.greenTintedWhite};
  }
  @media only screen and (min-width: ${breakpts.md}) {
    ${generateStylesForSize("t5", "desktop")}
  }
`;

export const ByDefaultP = styled.p`
  margin-top: 0;
  margin-bottom: 10px;
  ${generateStylesForSize("t5", "mobile")}

  @media only screen and (min-width: ${breakpts.md}) {
    ${generateStylesForSize("t5", "desktop")}
  }
`;
