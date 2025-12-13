import styled from "styled-components";
import { breakpts, colors, generateStylesForSize } from "data/styles-data.js";

export const BuoyContainer = styled.div`
  margin-bottom: 40px;
`;

export const BuoyContainerTitle = styled.h2`
  ${generateStylesForSize("t2")}
  @media only screen and (min-width: ${breakpts.md}) {
    ${generateStylesForSize("t2", "desktop")}
  }
`;

export const TextAndChartContainer = styled.div`
  @media only screen and (min-width: ${breakpts.sm}) {
    display: flex;
    gap: 20px;
  }
`;

export const ByStationName = styled.h2`
  margin-top: 0;
  color: ${colors.greenTintedWhite};
  ${generateStylesForSize("t2.5", "mobile")}
  @media only screen and (min-width: ${breakpts.md}) {
    ${generateStylesForSize("t2.5", "desktop")}
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  width: auto;
`;

export const LoadingText = styled.span`
  text-align: center;
  ${generateStylesForSize("t2.5", "mobile")}
  margin-left: 15px;
  margin-right: 15px;

  @media only screen and (min-width: ${breakpts.md}) {
    ${generateStylesForSize("t2.5", "desktop")}
  }
`;

export const LoadingIcon = styled.span`
  width: 80px;
  height: 80px;
  background-size: cover;
  background-image: url("/images/loading-bars.svg");
  display: inline-block;
`;

export const HelpIconButton = styled.button`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid ${colors.almostWhite};
  background: transparent;
  color: ${colors.almostWhite};
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  padding: 0;
  transition: all 0.2s ease;
  transform: translateY(-4px);

  &:hover {
    background: ${colors.almostBlack};
    color: ${colors.lightGreen};
    border-color: ${colors.lightGreen};
  }
`;
