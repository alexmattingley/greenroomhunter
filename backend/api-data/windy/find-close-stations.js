// This is a util funciton that will allow you to find when the most recent update was
function compareIsoDates(inputDate) {
  const obsDate = new Date(inputDate);
  const currentTime = new Date();
  return currentTime - obsDate;
}

// TODO:
// 1. create function to find the closest three stations to given cooridates from JSON file
// 2. create function that queries for each stations data based on metadata stationId.
// 2a. Does it make sense to do this with a cronjob and then just store the data in a database to limit the number of calls?
// 3. return that data to the front end so we can massage the data

// This function should be used to find the closest station. Currently doesn't do anything
const findStationsWithData = (windyData) => {
  const stationData = windyData.header;
  const workingStations = stationData.filter((itm) => {
    if (itm.observation.latestObs) {
      // Uncomment me if you want to see data structure
      // console.log(itm)
      return true;
    }
  });
};

module.exports = findStationsWithData;
