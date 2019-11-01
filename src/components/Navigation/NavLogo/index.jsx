import React from 'react';
import { NavLogoContainer, NavLogo, NavLogoName } from './index.styled.js';
import blackLogo from '../../../images/GRH-logo-black.png';

export default () => (
  <NavLogoContainer>
    <NavLogo src={blackLogo} alt="logo" />
    <NavLogoName>Green Room Hunter</NavLogoName>
  </NavLogoContainer>
);
