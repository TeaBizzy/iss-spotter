const { fetchMyIP, fetchCoordsByIp } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    throw (error);
  }
  console.log("It worked! Returned ip:", ip);

  fetchCoordsByIp(ip, (error, coordinates) => {
    if (error) {
      throw error;
    }
  
    console.log(coordinates);
  });
});
