import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLinksContainer, NavList, NavLink, NavSlash,
} from './index.styled.jsx';

const NavLinks = (props) => {
  const { currentPage } = props;
  return (
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
    </NavLinksContainer>
  );
};

NavLinks.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

export default NavLinks;
