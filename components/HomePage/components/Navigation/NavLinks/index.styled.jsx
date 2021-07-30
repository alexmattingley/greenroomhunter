/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import styled from 'styled-components';
import {
  colors, breakpts, generateStylesForSize,
} from 'data/styles-data.js';

const { lg } = breakpts;

export const NavLinksContainer = styled.ul`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

export const NavList = styled.li`
  list-style: none;
  ${generateStylesForSize('t4', 'mobile')}
  font-weight: 500;
  @media (min-width: ${lg}) {
    ${generateStylesForSize('t4', 'desktop')}
  }
`;

export const NavLink = styled(({
  // Filtering out non-standard props from link component
  currentPage, page, whiteNav, ...props
// eslint-disable-next-line react/jsx-props-no-spreading
}) => <a {...props} />)`

  border-bottom: ${(props) => {
    if (props.page === props.currentPage) {
      if (props.whiteNav) {
        return `2px solid ${colors.lightGreen};`;
      }
      return `2px solid ${colors.almostWhite};`;
    }
    return 'none;';
  }}};
  text-decoration: none;
  color: ${colors.almostBlack};
  transition-property: 'border';
  transition-duration: .5s;
`;

export const NavSlash = styled.li`
  padding-right: 10px;
  padding-left: 10px;
  color: ${colors.almostBlack};
  list-style: none;
  ${generateStylesForSize('t4', 'mobile')}
  font-weight: 500;
  @media (min-width: ${lg}) {
    ${generateStylesForSize('t4', 'desktop')}
  }
`;
