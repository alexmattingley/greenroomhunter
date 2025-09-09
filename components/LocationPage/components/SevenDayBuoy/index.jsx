import React from 'react';
import PropTypes from 'prop-types';
import { Container, Title, Image } from './index.styled.js';

const CDIPBuoyImage = (props) => {
  const { stationNum } = props;
  return (
    <Container>
      <Title>CDIP WW3 6 day forecast</Title>
      <Image src={`https://cdip.ucsd.edu/themes/media/images/plots/buoy_ww3.gd?stn=${stationNum}&stream=p1&pub=public&tz=PDT&units=english`} aria-hidden />
    </Container>
  );
};

CDIPBuoyImage.propTypes = {
  stationNum: PropTypes.string.isRequired,
};

export default CDIPBuoyImage;
