import styled from "styled-components";
import { CardContainer } from "components/Shared/Card/index.styled";
import { colors, breakpts } from "@/data/styles-data";

export const NBandContainer = styled(CardContainer)`
  @media only screen and (min-width: ${breakpts.lg}) {
    width: 30%;
  }
`;

export const NBandHeading = styled.h3``;

export const NBandList = styled.ul`
  padding: 0;
  margin: 0;
`;

export const NBandListItem = styled.li`
  list-style: none;
  padding: 5px 0;
  margin: 0;
  border-bottom: 1px solid ${colors.almostTransparentWhite};

  &:last-child {
    border-bottom: none;
  }
`;

export const NBandDirectionSpan = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const NBandDirectionArrow = styled.span<{ rotation: number }>`
  display: inline-flex;
  align-items: center;
  transform: rotate(${(props) => props.rotation}deg);
  transition: transform 0.2s ease;
`;
