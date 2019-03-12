const expressip = require("express-ip");
const request = require('request');

// display homepage
exports.index = function(req, res) {
  // get user location and the weather at location in sequence using async
  const ip = req.ipInfo;
  // this API key would be obfuscated, but the access it has is limited
  let apiKey = 'a84da6d6eef371d1706eb04d9aaf90d7';
  let city = ip.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  request(url, function(err, response, body) {
    if(err){
      return next(err);
    } else {
      let weather = JSON.parse(body);
      let msg = `It's ${weather.weather.description} in ${city}.`;
      res.render('index', { title: 'Movie Suggestions', message: msg });
    }
  });
};
