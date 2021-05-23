const request = require("postman-request");

const forecast = (lat, lon, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=a65c19fe0ba2dde0e9e7c8e57d34892d&query=" +
    lat +
    "," +
    lon;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        data: response.body.current,
      });
    }
  });
};

module.exports = forecast;
