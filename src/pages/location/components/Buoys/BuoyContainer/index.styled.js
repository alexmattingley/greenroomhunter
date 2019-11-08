import styled from 'styled-components';
import {
  breakpts,
} from 'data/styles-data.js';

export const BuoyContainer = styled.div`
  @media only screen and (min-width: ${breakpts.sm}) {
    display: flex;
  }
`;
