import styled from 'styled-components';
import {
  breakpts, generateStylesForSize,
} from '../../../data/styles-data.js';

const { lg } = breakpts;

export const NavLogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLogoName = styled.span`
  text-transform: uppercase;
  padding-left: 5px;
  ${generateStylesForSize('t3', 'mobile')}
  font-weight: 700;
  @media (min-width: ${lg}) {
    padding-left: 10px;
    ${generateStylesForSize('t3', 'desktop')}
  }
`;
export const NavLogo = styled.img`
  max-width: 50px;
  @media (min-width: ${lg}) {
    max-width: 80px;
  }
`;
