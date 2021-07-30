import React from 'react';
import PropTypes from 'prop-types';
import NavLogo from './NavLogo/index.jsx';
import NavLinks from './NavLinks/index.jsx';
import NavContainer from './index.styled.js';

const Navigation = (props) => {
  const { currentPage } = props;
  return (
    <NavContainer>
      <NavLogo />
      <NavLinks currentPage={currentPage} />
    </NavContainer>
  );
};

Navigation.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

export default Navigation;
