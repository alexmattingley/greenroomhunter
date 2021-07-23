import styled from 'styled-components';
import {
  colors, generateStylesForSize, breakpts,
} from '../../data/styles-data.js';

export const PageContainer = styled.div`
  background-color: ${colors.almostBlack};
  color: ${colors.almostWhite};
  padding: 20px;
  min-height: 100vh;
`;

export const ContentBlock = styled.div`
  max-width: 600px;
  margin: 80px auto;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
`;

export const ContentH1 = styled.h1`
  margin-top: 0;
  ${generateStylesForSize('t1', 'mobile')}
  margin-bottom: 60px;

  @media (min-width: ${breakpts.lg}) {
    ${generateStylesForSize('t1', 'desktop')}
  }
`;

export const ContentP = styled.p`
  ${generateStylesForSize('t6', 'mobile')}
  margin: 20px auto;

  @media (min-width: ${breakpts.lg}) {
    ${generateStylesForSize('t6', 'desktop')}
  }
`;

export const ContentH2 = styled.h2`
  ${generateStylesForSize('t2', 'mobile')}
  margin-top: 50px;
  margin-bottom: 30px;

  @media (min-width: ${breakpts.lg}) {
    ${generateStylesForSize('t2', 'desktop')}
  }
`;
