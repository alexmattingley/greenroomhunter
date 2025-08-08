import styled from 'styled-components';
import {
  colors, breakpts,
} from 'data/styles-data.js';

const { lg } = breakpts;

export const NavContainerStyled = styled.div`
 background-color: transparent;
  color: ${colors.almostWhite};
  transition-duration: 0.5s;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;

  @media only screen and (min-width: ${lg}) {
    padding: 15px 50px;
  }
`;

export default NavContainerStyled;
