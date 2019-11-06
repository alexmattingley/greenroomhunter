import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  colors, breakpts, generateStylesForSize,
} from 'data/styles-data.js';

export const SideNavContainer = styled.div`
  display: none;
  height: 100%;
  width: 20%;
  background: ${colors.almostBlack};
  color: ${colors.almostWhite};

  @media only screen and (min-width: ${breakpts.md}) {
    position: fixed;
    display: inline-block;
  }
`;

export const HomeLink = styled(Link)`

`;

export const HomeIcon = styled.span`
  display: inline-block;
  width: 45px;
  height: 45px;
  background: red;
`

export const HomeLinkText = styled.span`
  color: ${colors.almostWhite};
`
