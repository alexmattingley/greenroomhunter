import React from 'react';
import blackLogo from 'images/GRH-logo-black.png';
import { NavLogoContainer, NavLogo, NavLogoName } from './index.styled.js';

const NavLogoBlock = () => (
  <NavLogoContainer>
    <NavLogo src={blackLogo} alt="logo" />
    <NavLogoName>Green Room Hunter</NavLogoName>
  </NavLogoContainer>
);

export default NavLogoBlock;
