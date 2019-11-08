import styled from 'styled-components';
import {
  breakpts, generateStylesForSize,
} from 'data/styles-data.js';
import loadingBars from 'images/loading-bars.svg';

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  width: auto;
`;

export const LoadingText = styled.span`
  text-align: center;
  ${generateStylesForSize('t2', 'mobile')}
  font-weight: 500;
  margin-left: 15px;
  margin-right: 15px;

  @media only screen and (min-width: ${breakpts.md}) {
    ${generateStylesForSize('t2', 'desktop')}
  }
`;

export const LoadingIcon = styled.span`
  width: 80px;
  height: 80px;
  background-size: cover;
  background-image: url(${loadingBars});
  display: inline-block;
`;
