import React from 'react';
import blackLogo from 'images/GRH-logo-black.png';
import { NavLogoContainer, NavLogo, NavLogoName } from './index.styled.js';

export default () => (
  <NavLogoContainer>
    <NavLogo src={blackLogo} alt="logo" />
    <NavLogoName>Green Room Hunter</NavLogoName>
  </NavLogoContainer>
);
