import styled from 'styled-components';
import {
  colors, breakpts, generateStylesForSize,
} from 'data/styles-data.js';

export const CurrentTideCotainer = styled.div`
  margin-bottom: 20px;
`;

export const CurrentTideText = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-weight: bold;
  ${generateStylesForSize('t2', 'mobile')}
  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize('t2', 'desktop')}
  }
`;

export const HighAndLowTideContainer = styled.div`

`;

export const NextTideDescription = styled.div`
  ${generateStylesForSize('t4', 'mobile')}

  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize('t4', 'desktop')}
  }
`;


export const CurrentTideTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  ${generateStylesForSize('t2', 'mobile')}

  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize('t2', 'desktop')}
  }
`;

export const TideTableTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  ${generateStylesForSize('t2', 'mobile')}

  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize('t2', 'desktop')}
  }
`;

export const TideTableContainer = styled.div`
  padding: 20px 0;

  @media only screen and (min-width: ${breakpts.sm}) {
    padding: 0;
    min-width: 340px;
    order: 2;
  }

  @media only screen and (min-width: ${breakpts.lg}) {
    min-width: 415px;
  }
`;

export const TideTableRow = styled.div`
  ${generateStylesForSize('t5', 'mobile')}
  border-bottom: 1px solid ${colors.almostWhite};
  margin: 10px 0;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  width: 100%;
  align-items: center;
  justify-items: center;
  ${(props) => {
    const { point } = props;
    return point === 'High' ? `color: ${colors.gray}` : `color: ${colors.almostWhite};`;
  }}

  @media only screen and (min-width: ${breakpts.lg}) {
    ${generateStylesForSize('t5', 'desktop')}
  }
`;
