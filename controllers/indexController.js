const expressip = require("express-ip");
const request = require("request");
const async = require("async");

// This code is TERRIBLE. I'm sorry, close timetables from outside of project sucks.

function getMovieDetails(Movie, movieUrl) {
  console.log("GETMOVIEDETAILS");
  request(movieUrl[0], function(err, response, body) {
    Movie.title_1 = JSON.parse(body.Title);
    Movie.plot_1 = JSON.parse(body.Plot);
    Movie.score_1 = JSON.parse(body.Metascore);
  });
  request(movieUrl[1], function(err, response, body) {
    Movie.title_2 = JSON.parse(body.Title);
    Movie.plot_2 = JSON.parse(body.Plot);
    Movie.score_2 = JSON.parse(body.Metascore);
  });
  request(movieUrl[2], function(err, response, body) {
    Movie.title_3 = JSON.parse(body.Title);
    Movie.plot_3 = JSON.parse(body.Plot);
    Movie.score_3 = JSON.parse(body.Metascore);
  });

  return Movie;
}

function getWeather(url) {}

function getMovieUrl(genre, key) {
  console.log("GETMOVIEURL");
  let arr = [];
  arr.push(`http://www.omdbapi.com/?i=${genre[0]}&apikey=${movieKey}`);
  arr.push(`http://www.omdbapi.com/?i=${genre[1]}&apikey=${movieKey}`);
  arr.push(`http://www.omdbapi.com/?i=${genre[2]}&apikey=${movieKey}`);
  return arr;
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
  let movieUrl = [];
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

  var Movie = {
    title_1: "t1",
    title_2: "t2",
    title_3: "t3",
    plot_1: "p1",
    plot_2: "p2",
    plot_3: "p3",
    score_1: "s1",
    score_2: "s2",
    score_3: "s3"
  };

  // get weather request
  let weatherID = "err";
  request(url, function(err, response, body) {
    weatherID = JSON.parse(body).weather[0].id;
    console.log(weatherID);
  });
  console.log(weatherID);

  if (weatherID > 800 && weatherID < 805) {
    // cloudy - documentary
    documentary.sort(() => {
      return 0.5 - Math.random();
    });
    movieUrl = ` http://www.omdbapi.com/?i=${
      documentary[0]
    }&apikey=${movieKey}`;
  } else if (weatherID > 199 && weatherID < 233) {
    // thunder - thriller
    thriller.sort(() => {
      return 0.5 - Math.random();
    });
    movieUrl = ` http://www.omdbapi.com/?i=${thriller[0]}&apikey=${movieKey}`;
  } else if (weatherID > 299 && weatherID < 322) {
    // drizzle - drama
    drama.sort(() => {
      return 0.5 - Math.random();
    });
    movieUrl = ` http://www.omdbapi.com/?i=${drama[0]}&apikey=${movieKey}`;
  } else if (weatherID > 499 && weatherID < 532) {
    // rain - action
    action.sort(() => {
      return 0.5 - Math.random();
    });
    movieUrl = getMovieUrl(action, movieKey);
    getMovieDetails(Movie, movieUrl);
    res.render("index", {
      title: "Movie Suggestions",
      city: ip.city,
      movie_1: Movie.title_1,
      movie_2: Movie.title_2,
      movie_3: Movie.title_3,
      movie_1_plot: Movie.plot_1,
      movie_2_plot: Movie.plot_2,
      movie_3_plot: Movie.plot_3,
      movie_1_score: Movie.score_1,
      movie_2_score: Movie.score_2,
      movie_3_score: Movie.score_3
    });
  } else if (weatherID > 599 && weatherID < 623) {
    // snow - scifi
    scifi.sort(() => {
      return 0.5 - Math.random();
    });
    movieUrl = ` http://www.omdbapi.com/?i=${scifi[0]}&apikey=${movieKey}`;
  } else if (weatherID > 699 && weatherID < 782) {
    // atmosphere (mist/fog) - apocalypse
    apocalypse.sort(() => {
      return 0.5 - Math.random();
    });
    movieUrl = ` http://www.omdbapi.com/?i=${apocalypse[0]}&apikey=${movieKey}`;
  } else if (weatherID == 800) {
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
  }
};
