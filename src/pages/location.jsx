import React from 'react';

const Location = (props) => {
  const { match: { params: { location } } } = props;
  return (
    <div>
      Location:
      {location}
    </div>
  );
};

export default Location;
