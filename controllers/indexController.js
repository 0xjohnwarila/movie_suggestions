const expressip = require("express-ip");
const request = require("request");

// display homepage
exports.index = function(req, res) {
  // get user location and the weather at location in sequence using async
  const ip = req.ipInfo;
  // this API key would be obfuscated, but the access it has is limited
  const weatherKey = "a84da6d6eef371d1706eb04d9aaf90d7";
  const movieKey = "43f46c28";
  let city = ip.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;
  // imdb IDs for movies
  const comedy = [
    "tt0366551",
    "tt0467406",
    "tt0365748",
    "tt0780536",
    "tt0405422",
    "tt2278388",
    "tt0375063"
  ];
  const apocalypse = [
    "tt0120591",
    "tt0114746",
    "tt0898367",
    "tt0079501",
    "tt1179933",
    "tt2543164",
    "tt0053137"
  ];
  const drama = [
    'tt0111161',
    'tt0109830',
    'tt0031381',
    'tt0108052',
    'tt0167404',
    'tt0120338'
  ];
  const action = [
    'tt0095016',
    'tt1375666',
    'tt0266697',
    'tt0120815',
    'tt0440963',
    'tt0106977',
    'tt0381061'
  ];
  const thriller = [
    'tt0468569',
    'tt0107290',
    'tt1396484',
    'tt1454468',
    'tt0073195',
    'tt4912910',
    'tt0382625'
  ];
  const documentary = [
    'tt1772925',
    'tt0317910',
    'tt3518012',
    'tt4044364',
    'tt0110057',
    'tt1559549',
    'tt3578504'
  ];
  const scifi = [
    'tt0499549',
    'tt3748528',
    'tt0080684',
    'tt0796366',
    'tt3659388',
    'tt0816692',
    'tt0075860'
  ]
  const 
  // get weather request
  request(url, function(err, response, body) {
    if (err) {
      return next(err);
    } else {
      let weather = JSON.parse(body);
      let msg = "weatherType";
      if (weather.weather[0].id > 800 && weather.weather[0].id < 805) {
        // cloudy - documentary
        documentary.sort( () => { return 0.5 - Math.random() })
        msg = documentary[0] + ' ' + documentary[1] + ' ' + documentary[2];
      } else if (weather.weather[0].id > 199 && weather.weather[0].id < 233) {
        // thunder - thriller
        documentary.sort( () => { return 0.5 - Math.random() })
        msg = documentary[0] + ' ' + documentary[1] + ' ' + documentary[2];
        msg = "Thunder";
      } else if (weather.weather[0].id > 299 && weather.weather[0].id < 322) {
        // drizzle - drama
        documentary.sort( () => { return 0.5 - Math.random() })
        msg = documentary[0] + ' ' + documentary[1] + ' ' + documentary[2];
        msg = "Drizzle";
      } else if (weather.weather[0].id > 499 && weather.weather[0].id < 532) {
        // rain - action
        documentary.sort( () => { return 0.5 - Math.random() })
        msg = documentary[0] + ' ' + documentary[1] + ' ' + documentary[2];
        msg = "Rain";
      } else if (weather.weather[0].id > 599 && weather.weather[0].id < 623) {
        // snow - scifi
        documentary.sort( () => { return 0.5 - Math.random() })
        msg = documentary[0] + ' ' + documentary[1] + ' ' + documentary[2];
        msg = "Snow";
      } else if (weather.weather[0].id > 699 && weather.weather[0].id < 782) {
        // atmosphere (mist/fog) - apocalypse
        documentary.sort( () => { return 0.5 - Math.random() })
        msg = documentary[0] + ' ' + documentary[1] + ' ' + documentary[2];
        msg = "Atmosphere";
      } else if (weather.weather[0].id == 800) {
        // clear - comedy
        documentary.sort( () => { return 0.5 - Math.random() })
        msg = documentary[0] + ' ' + documentary[1] + ' ' + documentary[2];
        msg = "Clear";
      } else {
        msg = "err";
      }
      res.render("index", {
        title: "Movie Suggestions",
        message: msg,
        code: weather.weather[0].id
      });
    }
  });
};
