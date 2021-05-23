const request = require("postman-request");

const geocode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1IjoidW11cmdzIiwiYSI6ImNrb3p1ejE5cTEzZ28yb21wdDg4bDl2OWYifQ.n8PqjPnwE_adyGT2rc4pqA";
    request({ url, json: true }, (error, response) => {
      if (error) {
        callback("Unable to connect to location services", undefined);
      } else if (!response.body.features) {
        callback("Try another location", undefined);
      } else {
        const features = response.body.features[0];
        callback(undefined, {
          latitude: features.center[1],
          logitude: features.center[0],
          location: features.place_name,
        });
      }
    });
  };

  module.exports = geocode;