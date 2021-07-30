const fetch = require('node-fetch');

const fetchWindyData = async () => {
  try {
    const response = await fetch('https://stations.windy.com/pws/stations/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6MTM1NDYzNiwiaWF0IjoxNTcwODEwODg5fQ.7Vapl4H1geVaadKVbs6nmssXMoLogJQkgGa8uuVkZnM');
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

module.exports = fetchWindyData;
