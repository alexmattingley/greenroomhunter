import React from 'react';
import { NavLogoContainer, NavLogo, NavLogoName } from './index.styled.js';

const NavLogoBlock = () => (
  <NavLogoContainer>
    <NavLogo src="/images/GRH-logo-black.png" alt="logo" />
    <NavLogoName>Green Room Hunter</NavLogoName>
  </NavLogoContainer>
);

export default NavLogoBlock;
