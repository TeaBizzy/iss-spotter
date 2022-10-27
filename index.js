const { fetchMyIP } = require("./iss");

fetchMyIP((error, ip) => {
  if(error) {
    throw(error);
  }
  console.log("It worked! Returned ip:", ip);
 });