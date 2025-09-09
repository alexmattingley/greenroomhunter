import styled from 'styled-components';
import { breakpts } from 'data/styles-data.js';

const TideChartContainer = styled.div`
  @media only screen and (min-width: ${breakpts.sm}) {
    flex-grow: 1;
    order: 1;
  }
`;

export default TideChartContainer;
