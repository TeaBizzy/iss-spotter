const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request.get("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }


    const data = JSON.parse(body);
    
    callback(null, data.ip);
  });
};

const fetchCoordsByIp = function(ip, callback) {
  request.get(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates. Response: ${body}`;
      callback(Error(msg), null);
    }
    
    const data = JSON.parse(body);
    
    if (data.success === false) {
      const msg = `Success status was ${data.success}. Server message says: ${data.message}`;
      callback(Error(msg), null);
    }

    const coordinates = {
      latitude: data.latitude,
      longitude: data.longitude
    };

    callback(null, coordinates);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIp };