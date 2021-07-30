import styled from 'styled-components';
import { breakpts } from 'data/styles-data.js';

const BuoyChartContainer = styled.div`

  @media only screen and (min-width: ${breakpts.sm}) {
    padding: 20px;
    flex-grow: 1;
  }
`;

export default BuoyChartContainer;
