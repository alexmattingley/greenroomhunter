const https = require('https');

module.exports = () => {
  https.get('https://www.ndbc.noaa.gov/data/realtime2/46232.txt', (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  }).on('error', (e) => {
    console.error(e);
  });
}

// module.exports = () => {
//   const options = {
//     url: 'https://www.ndbc.noaa.gov/data/realtime2/46232.txt',
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-Charset': 'utf-8',
//     },
//   };
//   request(options, (err, res, body) => {
//     if (err) { return console.log(err); }
//     console.log(body);
//   });
// };
