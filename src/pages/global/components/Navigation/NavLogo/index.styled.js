import styled from 'styled-components';
import {
  breakpts, generateStylesForSize,
} from 'data/styles-data.js';

const { lg } = breakpts;

export const NavLogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLogoName = styled.span`
  text-transform: uppercase;
  ${generateStylesForSize('t4', 'mobile')}
  font-weight: 700;

  @media (min-width: ${lg}) {
    ${generateStylesForSize('t4', 'desktop')}
  }
`;
