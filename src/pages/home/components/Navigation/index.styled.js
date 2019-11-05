import styled from 'styled-components';
import {
  colors, breakpts,
} from 'data/styles-data.js';

const { lg } = breakpts;

export default styled.div`
  ${(props) => {
    if (props.whiteNav) {
      return `background-color: ${colors.almostWhiteMild};`;
    }
    return 'background-color: transparent';
  }}
  transition-property: 'background-color';
  transition-duration: 0.5s;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
  padding: 15px;
  position: fixed;
  z-index: 5;

  @media only screen and (min-width: ${lg}) {
    padding-left: 50px;
    padding-right: 50px;
  }
`;
