import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  colors, breakpts, generateStylesForSize,
} from 'data/styles-data.js';

export const ContentContainer = styled.div`
  background-color: ${colors.almostBlack};
  color: ${colors.almostWhite};
  margin-right: auto;
  margin-left: auto;

  @media only screen and (min-width: ${breakpts.md}) {
    max-width: 892px;
  }

  @media only screen and (min-width: ${breakpts.lg}) {
    max-width: 1200px;
  }
`;

export const LocationsHeader = styled.h2`
  margin: 0;
  padding: 30px 15px 15px 15px;
  ${generateStylesForSize('t2', 'mobile')}
`;

export const LocationsUl = styled.ul`
  padding-left: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const LocationsLi = styled.li`
  width: 100%;
  padding: 15px;
  list-style-type: none;
  @media only screen and (min-width: ${breakpts.xs}) {
    width: ${(1 / 2) * 100}%;
  }
  @media only screen and (min-width: ${breakpts.md}) {
    width: ${(1 / 3) * 100}%;
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
  text-align: center;
  text-decoration: none;

  @media only screen and (min-width: ${breakpts.md}) {
    text-align: left;
    padding-right: 20px;
    padding-left: 20px;
  }

  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize('t4', 'desktop')}
  }
`;

export const LocationsBlock = styled.div`
  width: 100%;
  background-color: ${colors.almostBlack};
`

export const LocationsLink = styled(Link)`
  text-decoration: none;
`;
