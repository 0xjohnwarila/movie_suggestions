const expressip = require("express-ip");
const request = require('request');

// display homepage
exports.index = function(req, res) {
  // get user location and the weather at location in sequence using async
  const ip = req.ipInfo;
  // this API key would be obfuscated, but the access it has is limited
  let weatherKey = 'a84da6d6eef371d1706eb04d9aaf90d7';
  let movieKey = '43f46c28';
  let city = ip.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;
  request(url, function(err, response, body) {
    if(err){
      return next(err);
    } else {
      let weather = JSON.parse(body);
      let msg = 'weatherType';
      if(weather.weather[0].id > 800 && weather.weather[0].id < 805) {
        let msg = 'Clouds';
      }
      else if(weather.weather[0].id > 199 && weather.weather[0].id < 233) {
        let msg = 'Thunder';
      }
      else if(weather.weather[0].id > 299 && weather.weather[0].id < 322) {
        let msg = 'Drizzle';
      }
      else if(weather.weather[0].id > 499 && weather.weather[0].id < 532) {
        let msg = 'Rain';
      }
      else if(weather.weather[0].id > 599 && weather.weather[0].id < 623) {
        let msg = 'Snow';
      }
      else if(weather.weather[0].id > 699 && weather.weather[0].id < 782) {
        let msg = 'Atmosphere';
      }
      else if(weather.weather[0].id == 800) {
        let msg = 'Clear';
      }
      else {
        let msg = 'err';
      }
      res.render('index', { title: 'Movie Suggestions', message: msg, code: weather.weather[0].id});
    }
  });
};
