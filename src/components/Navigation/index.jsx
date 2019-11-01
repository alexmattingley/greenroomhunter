import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  colors, breakpts, generateStylesForSize,
} from '../../data/styles-data.js';
import blackLogo from '../../images/GRH-logo-black.png';

const { lg } = breakpts;

export const NavContainer = styled.div`
  ${(props) => {
    if (props.whiteNav) {
      return `background-color: ${colors.almostWhite}`;
    }
    return 'background-color: transparent';
  }}
  transition-property: 'background-color';
  transition-duration: .5s;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
  padding: 15px;
  position: fixed;
  z-index: 5;

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

  border-bottom: ${(props) => {
    if (props.page === props.currentPage) {
      if (props.whiteNav) {
        return `2px solid ${colors.almostBlack};`;
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
`;

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = { whiteNav: false };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.pageYOffset > 0) {
      this.setState({
        whiteNav: true,
      });
    } else {
      this.setState({
        whiteNav: false,
      });
    }
  }

  render() {
    const { currentPage } = this.props;
    const { whiteNav } = this.state;
    return (
      <NavContainer whiteNav={whiteNav}>
        <NavLogoContainer>
          <NavLogo src={blackLogo} alt="logo" />
          <NavLogoName>Green Room Hunter</NavLogoName>
        </NavLogoContainer>
        <NavLinksContainer>
          <NavList>
            <NavLink
              page="Home"
              currentPage={currentPage}
              whiteNav={whiteNav}
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
              whiteNav={whiteNav}
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
              whiteNav={whiteNav}
              to="/contact"
            >
              Contact
            </NavLink>
          </NavList>
        </NavLinksContainer>
      </NavContainer>
    );
  }
};

export default Navigation;
