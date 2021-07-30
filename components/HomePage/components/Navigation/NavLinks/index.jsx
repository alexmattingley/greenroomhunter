import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLinksContainer, NavList, NavLink, NavSlash,
} from './index.styled.jsx';

const NavLinks = (props) => {
  const { currentPage, whiteNav } = props;
  return (
    <NavLinksContainer>
      <NavList>
        <NavLink
          page="Home"
          currentPage={currentPage}
          whiteNav={whiteNav}
          href="/"
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
          href="/about"
        >
          About
        </NavLink>
      </NavList>
    </NavLinksContainer>
  );
};

NavLinks.propTypes = {
  currentPage: PropTypes.string.isRequired,
  whiteNav: PropTypes.bool.isRequired,
};

export default NavLinks;
