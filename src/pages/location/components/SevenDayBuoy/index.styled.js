import styled from 'styled-components';
import { breakpts, generateStylesForSize } from 'data/styles-data.js';

export const Container = styled.div`
    overflow-x: scroll;
    @media only screen and (min-width: ${breakpts.sm}) {
       overflow: hidden;
      }
`;

export const Title = styled.h2`
  margin-top: 0;
  ${generateStylesForSize('t2', 'mobile')}

  @media only screen and (min-width: ${breakpts.md}) {
    ${generateStylesForSize('t2', 'desktop')}
  }
`;

export const Image = styled.img`
  filter: invert(87%);
`;
