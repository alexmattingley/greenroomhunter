import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, breakpts, typescales, generateStylesForSize } from '../../data/styles-data.js';
import blackLogo from '../../images/GRH-logo-black.png';


const { t3 } = typescales;
const { sm, lg } = breakpts;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
  padding: 15px;
  background-color: ${colors.lightGreen};
  position: fixed;

  @media only screen and (min-width: ${lg}) {
    padding-left: 50px;
    padding-right: 50px;
  }
`;

export const NavLinksContainer = styled.ul`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

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

export const NavList = styled.li`
  list-style: none;
  ${generateStylesForSize('t4', 'mobile')}
  font-weight: 500;
  @media (min-width: ${lg}) {
    padding-left: 10px;
    ${generateStylesForSize('t4', 'desktop')}
  }
`;

export const NavLink = styled(Link)`
  border-bottom: ${(props) => (props.page === props.currentPage ? `2px solid ${colors.almostWhite};` : 'none')}};
  text-decoration: none;
  color: ${colors.almostBlack};
`;

export const NavSlash = styled.li`
  padding-right: 10px;
  padding-left: 10px;
  color: ${colors.almostBlack};
  list-style: none;
`;

const Navigation = (props) => {
  const { currentPage } = props;
  return (
    <NavContainer>
      <NavLogoContainer>
        <NavLogo src={blackLogo} alt="logo" />
        <NavLogoName>Green Room Hunter</NavLogoName>
      </NavLogoContainer>
      <NavLinksContainer>
        <NavList>
          <NavLink
            page="Home"
            currentPage={currentPage}
            to="/"
          >
              Home
          </NavLink>
        </NavList>
        <NavSlash>
          /
        </NavSlash>
        <NavList>
          <NavLink
            page="About"
            currentPage={currentPage}
            to="/about"
          >
            About
          </NavLink>
        </NavList>
        <NavSlash>
          /
        </NavSlash>
        <NavList>
          <NavLink
            page="Contact"
            currentPage={currentPage}
            to="/contact"
          >
            Contact
          </NavLink>
        </NavList>
      </NavLinksContainer>
    </NavContainer>
  );
};

export default Navigation;
