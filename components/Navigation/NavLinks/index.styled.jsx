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
  padding: 10px 0;
  margin: 0;

  @media (min-width: ${lg}) {
    padding: 10px 0 10px 10px;
  }
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
  currentPage, page, whiteBg, ...props
// eslint-disable-next-line react/jsx-props-no-spreading
}) => <a {...props} />)`

  border-bottom: ${(props) => {
    if (props.page === props.currentPage) {
      return `2px solid ${colors.lightGreen};`;
    }
    return 'none;';
  }}};
  text-decoration: none;
  color: ${colors.almostWhite};
`;

export const NavSlash = styled.li`
  padding-right: 10px;
  padding-left: 10px;
  color: ${colors.almostWhite};
  list-style: none;
  ${generateStylesForSize('t4', 'mobile')}
  font-weight: 500;
  @media (min-width: ${lg}) {
    ${generateStylesForSize('t4', 'desktop')}
  }
`;
