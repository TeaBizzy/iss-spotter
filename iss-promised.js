const request = require("request-promise-native");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function() {
  return request(request.get("https://api.ipify.org?format=json"));
};


/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
const fetchCoordsByIp = function(ip) {
  ip = JSON.parse(ip).ip;
  return request(request.get(`http://ipwho.is/${ip}`));
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coordinates) {
  coordinates = JSON.parse(coordinates);
  coordinates = {
    longitude: coordinates.longitude,
    latitude: coordinates.latitude
  }
  return request(request.get(`https://iss-flyover.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`));
};


// Calls each function
const nextISSTimesForMyLocation = function() {
  fetchMyIP()
  .then(fetchCoordsByIp)
  .then(fetchISSFlyOverTimes)
  .then(printFlyOvers)
  .catch(error => console.log("It didn't work: ", error.message));
};


// Logs the next 5 flyovers in a human readable format
const printFlyOvers = function(passTimes) {
  passTimes = JSON.parse(passTimes).response;
  passTimes.forEach((passTime) => {
    console.log(`Next pass at ${new Date(passTime.risetime * 1000)} for ${passTime.duration} seconds!`); // We have to multiple our risttimes by 1000 because linux??
  });
}

module.exports = { nextISSTimesForMyLocation };