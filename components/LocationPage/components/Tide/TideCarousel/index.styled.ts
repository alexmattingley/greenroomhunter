import styled from "styled-components";
import {
  colors,
  breakpts,
  borderRadius,
  generateStylesForSize,
} from "data/styles-data.js";

export const CarouselRoot = styled.div`
  background: ${colors.almostTransparentGray};
  padding: 12px;
  border-radius: ${borderRadius.sm};
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
`;

export const ViewToggle = styled.div`
  display: inline-flex;
  border: 1px solid ${colors.lightGreen};
  border-radius: ${borderRadius.xs};
  overflow: hidden;
`;

export const ToggleButton = styled.button`
  padding: 4px 10px;
  border: none;
  background: transparent;
  color: ${colors.almostWhite};
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;

  @media only screen and (min-width: ${breakpts.md}) {
    padding: 6px 16px;
    font-size: inherit;
  }

  &.is-active {
    background: ${colors.lightGreen};
    color: ${colors.almostBlack};
  }

  &:not(.is-active):hover {
    background: ${colors.almostBlackTransparent};
  }
`;

export const Viewport = styled.div`
  overflow: hidden;
`;

export const Track = styled.div`
  display: flex;
`;

export const Slide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  padding: 0 4px;
`;

export const SlideHeading = styled.h4`
  margin: 0 0 8px;
  text-align: center;
  color: ${colors.almostWhite};
  ${generateStylesForSize("t5", "mobile")}

  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize("t5", "desktop")}
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
`;

export const ArrowButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border: none;
  border-radius: ${borderRadius.xs};
  background: ${colors.almostBlackTransparent};
  color: ${colors.almostWhite};
  cursor: pointer;

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }

  &:not(:disabled):hover {
    background: ${colors.almostBlack};
  }
`;

export const Dots = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const Dot = styled.button`
  width: 10px;
  height: 10px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: ${colors.gray};
  cursor: pointer;

  &.is-selected {
    background: ${colors.lightGreen};
  }

  @media only screen and (min-width: ${breakpts.sm}) {
    width: 12px;
    height: 12px;
  }
`;
