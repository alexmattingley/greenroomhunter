import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  colors, breakpts, generateStylesForSize,
} from 'data/styles-data.js';

export const SideNavContainer = styled.div`
  display: none;
  height: 100%;
  width: 300px;

  @media only screen and (min-width: ${breakpts.md}) {
    display: inline-block;
  }
`;

export const HomeLink = styled(Link)`

`;

export const HomeIcon = styled.span`

`

export const HomeLinkText = styled.span`

`
