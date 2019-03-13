const expressip = require("express-ip");
const request = require("request");

// This code is TERRIBLE. I'm sorry, close timetables from outside of project sucks.

function getMovieDetails(movieUrl) {
  request(movieUrl, function(err, response, body) {
    return JSON.parse(body);
  });
}

// display homepage
exports.index = function(req, res) {
  // get user location and the weather at location in sequence using async
  const ip = req.ipInfo;
  // this API key would be obfuscated, but the access it has is limited
  const weatherKey = "a84da6d6eef371d1706eb04d9aaf90d7";
  const movieKey = "43f46c28";
  const city = ip.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;
  let movieUrl = "movieURL";
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
    "tt0111161",
    "tt0109830",
    "tt0031381",
    "tt0108052",
    "tt0167404",
    "tt0120338"
  ];
  const action = [
    "tt0095016",
    "tt1375666",
    "tt0266697",
    "tt0120815",
    "tt0440963",
    "tt0106977",
    "tt0381061"
  ];
  const thriller = [
    "tt0468569",
    "tt0107290",
    "tt1396484",
    "tt1454468",
    "tt0073195",
    "tt4912910",
    "tt0382625"
  ];
  const documentary = [
    "tt1772925",
    "tt0317910",
    "tt3518012",
    "tt4044364",
    "tt0110057",
    "tt1559549",
    "tt3578504"
  ];
  const scifi = [
    "tt0499549",
    "tt3748528",
    "tt0080684",
    "tt0796366",
    "tt3659388",
    "tt0816692",
    "tt0075860"
  ];
  // get weather request
  request(url, function(err, response, body) {
    if (err) {
      return next(err);
    } else {
      let weather = JSON.parse(body);
      let movie_1 = "movie_1";
      let movie_2 = "movie_2";
      let movie_3 = "movie_3";
      let movie_1_plot = "movie_1_plot";
      let movie_2_plot = "movie_2_plot";
      let movie_3_plot = "movie_3_plot";
      let movie_1_score = "movie_1_score";
      let movie_2_score = "movie_2_score";
      let movie_3_score = "movie_3_score";
      // REMOVE THIS
      let msg = "req not completed";

      if (weather.weather[0].id > 800 && weather.weather[0].id < 805) {
        // cloudy - documentary
        documentary.sort(() => {
          return 0.5 - Math.random();
        });
        movieUrl = ` http://www.omdbapi.com/?i=${
          documentary[0]
        }&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_1 = movie.Title;
            movie_1_plot = movie.Plot;
            movie_1_score = movie.Metascore;
          }
        });
        movieUrl = ` http://www.omdbapi.com/?i=${
          documentary[1]
        }&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_2 = movie.Title;
            movie_2_plot = movie.Plot;
            movie_2_score = movie.Metascore;
          }
        });
        movieUrl = ` http://www.omdbapi.com/?i=${
          documentary[1]
        }&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_3 = movie.Title;
            movie_3_plot = movie.Plot;
            movie_3_score = movie.Metascore;
          }
        });
      } else if (weather.weather[0].id > 199 && weather.weather[0].id < 233) {
        // thunder - thriller
        thriller.sort(() => {
          return 0.5 - Math.random();
        });
        movieUrl = ` http://www.omdbapi.com/?i=${
          thriller[0]
        }&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_1 = movie.Title;
            movie_1_plot = movie.Plot;
            movie_1_score = movie.Metascore;
          }
        });
        movieUrl = ` http://www.omdbapi.com/?i=${
          thriller[1]
        }&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_2 = movie.Title;
            movie_2_plot = movie.Plot;
            movie_2_score = movie.Metascore;
          }
        });
        movieUrl = ` http://www.omdbapi.com/?i=${
          thriller[1]
        }&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_3 = movie.Title;
            movie_3_plot = movie.Plot;
            movie_3_score = movie.Metascore;
          }
        });
      } else if (weather.weather[0].id > 299 && weather.weather[0].id < 322) {
        // drizzle - drama
        drama.sort(() => {
          return 0.5 - Math.random();
        });
        movieUrl = ` http://www.omdbapi.com/?i=${drama[0]}&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_1 = movie.Title;
            movie_1_plot = movie.Plot;
            movie_1_score = movie.Metascore;
          }
        });
        movieUrl = ` http://www.omdbapi.com/?i=${drama[1]}&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_2 = movie.Title;
            movie_2_plot = movie.Plot;
            movie_2_score = movie.Metascore;
          }
        });
        movieUrl = ` http://www.omdbapi.com/?i=${drama[1]}&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_3 = movie.Title;
            movie_3_plot = movie.Plot;
            movie_3_score = movie.Metascore;
          }
        });
      } else if (weather.weather[0].id > 499 && weather.weather[0].id < 532) {
        // rain - action
        action.sort(() => {
          return 0.5 - Math.random();
        });
        movieUrl = `http://www.omdbapi.com/?i=${action[0]}&apikey=${movieKey}`;
        request(movieUrl, function(err, response, body) {
          let movie = JSON.parse(body);
          movie_1 = movie.Title;
          console.log("*********");
          console.log(movie_1);
          console.log("*********");
          movie_1_plot = movie.Plot;
          movie_1_score = movie.Metascore;
        });
        console.log(movie_1);
      } else if (weather.weather[0].id > 599 && weather.weather[0].id < 623) {
        // snow - scifi
        scifi.sort(() => {
          return 0.5 - Math.random();
        });
        movieUrl = ` http://www.omdbapi.com/?i=${scifi[0]}&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_1 = movie.Title;
            movie_1_plot = movie.Plot;
            movie_1_score = movie.Metascore;
          }
        });
        movieUrl = ` http://www.omdbapi.com/?i=${scifi[1]}&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_2 = movie.Title;
            movie_2_plot = movie.Plot;
            movie_2_score = movie.Metascore;
          }
        });
        movieUrl = ` http://www.omdbapi.com/?i=${scifi[1]}&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_3 = movie.Title;
            movie_3_plot = movie.Plot;
            movie_3_score = movie.Metascore;
          }
        });
      } else if (weather.weather[0].id > 699 && weather.weather[0].id < 782) {
        // atmosphere (mist/fog) - apocalypse
        apocalypse.sort(() => {
          return 0.5 - Math.random();
        });
        movieUrl = ` http://www.omdbapi.com/?i=${
          apocalypse[0]
        }&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_1 = movie.Title;
            movie_1_plot = movie.Plot;
            movie_1_score = movie.Metascore;
          }
        });
        movieUrl = ` http://www.omdbapi.com/?i=${
          apocalypse[1]
        }&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_2 = movie.Title;
            movie_2_plot = movie.Plot;
            movie_2_score = movie.Metascore;
          }
        });
        movieUrl = ` http://www.omdbapi.com/?i=${
          apocalypse[1]
        }&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_3 = movie.Title;
            movie_3_plot = movie.Plot;
            movie_3_score = movie.Metascore;
          }
        });
      } else if (weather.weather[0].id == 800) {
        // clear - comedy
        comedy.sort(() => {
          return 0.5 - Math.random();
        });
        movieUrl = ` http://www.omdbapi.com/?i=${comedy[0]}&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_1 = movie.Title;
            movie_1_plot = movie.Plot;
            movie_1_score = movie.Metascore;
          }
        });
        movieUrl = ` http://www.omdbapi.com/?i=${comedy[1]}&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_2 = movie.Title;
            movie_2_plot = movie.Plot;
            movie_2_score = movie.Metascore;
          }
        });
        movieUrl = ` http://www.omdbapi.com/?i=${comedy[1]}&apikey=${movieKey}`;
        request(url, (err, response, body) => {
          if (err) {
            return next(err);
          } else {
            let movie = JSON.parse(body);
            movie_3 = movie.Title;
            movie_3_plot = movie.Plot;
            movie_3_score = movie.Metascore;
          }
        });
      }
      res.render("index", {
        title: "Movie Suggestions",
        city: ip.city,
        msg: msg,
        movie_1: movie_1,
        movie_2: movie_2,
        movie_3: movie_3,
        movie_1_plot: movie_1_plot,
        movie_2_plot: movie_2_plot,
        movie_3_plot: movie_3_plot,
        movie_1_score: movie_1_score,
        movie_2_score: movie_2_score,
        movie_3_score: movie_3_score
      });
    }
  });
};
