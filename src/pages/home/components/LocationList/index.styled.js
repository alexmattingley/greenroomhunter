import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  colors, breakpts, generateStylesForSize, homePageSpacing,
} from 'data/styles-data.js';

const { itmSpacing, leftMargin } = homePageSpacing;

const itmContainerLeftover = leftMargin - itmSpacing;

export const ContentContainer = styled.div`
  background-color: ${colors.almostBlack};
  color: ${colors.almostWhite};
`;

export const LocationsHeader = styled.h2`
  margin: 0;
  padding: 30px ${itmSpacing}px 15px ${itmSpacing}px;
  ${generateStylesForSize('t2', 'mobile')}

  @media only screen and (min-width: ${breakpts.lg}) {
    padding-left: ${leftMargin}px;
  }
`;

export const LocationsUl = styled.ul`
  padding-left: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  @media only screen and (min-width: ${breakpts.lg}) {
    padding-left: ${itmContainerLeftover}px;
    padding-right: ${itmContainerLeftover}px;
  }
`;

export const LocationsLi = styled.li`
  width: 100%;
  padding: ${itmSpacing}px;
  list-style-type: none;
  transition: all 0.5s;

  :hover {
    background-color: ${colors.lightGreen};
  }

  @media only screen and (min-width: ${breakpts.xs}) {
    width: ${(1 / 2) * 100}%;
  }

  @media only screen and (min-width: ${breakpts.md}) {
    width: ${(1 / 3) * 100}%;
  }

  @media only screen and (min-width: ${breakpts.xl}) {
    width: ${(1 / 5) * 100}%;
  }
`;

export const LocationImage = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: bottom;
  max-width: 100%;
  height: 252px;

  @media only screen and (min-width: ${breakpts.md}) {
    height: 200px;
  }

  @media only screen and (min-width: ${breakpts.lg}) {
    height: 370px;
  }
`;

export const LocationName = styled.h6`
  ${generateStylesForSize('t4', 'mobile')}
  color: ${colors.almostWhite};
  margin: 0;
  padding: 20px 0 10px 0;
  text-decoration: none;

  @media only screen and (min-width: ${breakpts.md}) {
    padding-right: ${itmSpacing}px;
    padding-left: ${itmSpacing}px;
  }

  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize('t4', 'desktop')}
  }
`;

export const LocationsBlock = styled.div`
  width: 100%;
  background-color: ${colors.almostBlack};
`;

export const LocationsLink = styled(Link)`
  text-decoration: none;
`;
