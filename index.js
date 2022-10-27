const { nextISSTimesForMyLocation} = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if(error) {
    throw error;
  }

  passTimes.forEach((passTime) => {
    console.log(`Next pass at ${new Date(passTime.risetime * 1000)} for ${passTime.duration} seconds!`) // We have to multiple our risttimes by 1000 because linux??
  });
});