const expressip = require("express-ip");
const request = require("request");
const async = require("async");
const fetch = require("node-fetch");

// This code is better than it was, still a lot of ineffeciency...
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

  const getWeatherData = async url => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.weather[0].id;
    } catch (err) {
      return next(err);
    }
  };

  const getMovieTitle = async url => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.Title;
    } catch (err) {
      return next(err);
    }
  };

  const getMoviePlot = async url => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.Plot;
    } catch (err) {
      return next(err);
    }
  };

  const getMovieScore = async url => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.Metascore;
    } catch (err) {
      return next(err);
    }
  };

  const getMovieData = url => {
    const title = getMovieTitle(url);
    const plot = getMoviePlot(url);
    const score = getMovieScore(url);
    return { title, plot, score };
  };

  // get weather ID
  const weatherID = getWeatherData(url);

  // choose genre based on weather ID
  if (weatherID > 800 && weatherID < 805) {
    // cloudy - documentary

    // sort documentary list and choose the top 3
    documentary.sort(() => {
      return 0.5 - Math.random();
    });
    const { movie_1, movie_1_plot, movie_1_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[0]}&apikey=${movieKey}`
    );
    const { movie_2, movie_2_plot, movie_2_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[1]}&apikey=${movieKey}`
    );
    const { movie_3, movie_3_plot, movie_3_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[2]}&apikey=${movieKey}`
    );
    res.render("index", {
      movie_1: movie_1,
      movie_1_plot: movie_1_plot,
      movie_1_score: movie_1_score,
      movie_2: movie_2,
      movie_2_plot: movie_2_plot,
      movie_2_score: movie_2_score,
      movie_3: movie_3,
      movie_3_plot: movie_3_plot,
      movie_3_score: movie_3_score
    });
  } else if (weatherID > 199 && weatherID < 233) {
    // thunder - thriller
    thriller.sort(() => {
      return 0.5 - Math.random();
    });
    const { movie_1, movie_1_plot, movie_1_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[0]}&apikey=${movieKey}`
    );
    const { movie_2, movie_2_plot, movie_2_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[1]}&apikey=${movieKey}`
    );
    const { movie_3, movie_3_plot, movie_3_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[2]}&apikey=${movieKey}`
    );
    res.render("index", {
      movie_1: movie_1,
      movie_1_plot: movie_1_plot,
      movie_1_score: movie_1_score,
      movie_2: movie_2,
      movie_2_plot: movie_2_plot,
      movie_2_score: movie_2_score,
      movie_3: movie_3,
      movie_3_plot: movie_3_plot,
      movie_3_score: movie_3_score
    });
  } else if (weatherID > 299 && weatherID < 322) {
    // drizzle - drama
    drama.sort(() => {
      return 0.5 - Math.random();
    });
    const { movie_1, movie_1_plot, movie_1_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[0]}&apikey=${movieKey}`
    );
    const { movie_2, movie_2_plot, movie_2_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[1]}&apikey=${movieKey}`
    );
    const { movie_3, movie_3_plot, movie_3_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[2]}&apikey=${movieKey}`
    );
    res.render("index", {
      movie_1: movie_1,
      movie_1_plot: movie_1_plot,
      movie_1_score: movie_1_score,
      movie_2: movie_2,
      movie_2_plot: movie_2_plot,
      movie_2_score: movie_2_score,
      movie_3: movie_3,
      movie_3_plot: movie_3_plot,
      movie_3_score: movie_3_score
    });
  } else if (weatherID > 499 && weatherID < 532) {
    // rain - action
    action.sort(() => {
      return 0.5 - Math.random();
    });
    const { movie_1, movie_1_plot, movie_1_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[0]}&apikey=${movieKey}`
    );
    const { movie_2, movie_2_plot, movie_2_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[1]}&apikey=${movieKey}`
    );
    const { movie_3, movie_3_plot, movie_3_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[2]}&apikey=${movieKey}`
    );
    res.render("index", {
      movie_1: movie_1,
      movie_1_plot: movie_1_plot,
      movie_1_score: movie_1_score,
      movie_2: movie_2,
      movie_2_plot: movie_2_plot,
      movie_2_score: movie_2_score,
      movie_3: movie_3,
      movie_3_plot: movie_3_plot,
      movie_3_score: movie_3_score
    });
  } else if (weatherID > 599 && weatherID < 623) {
    // snow - scifi
    scifi.sort(() => {
      return 0.5 - Math.random();
    });
    const { movie_1, movie_1_plot, movie_1_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[0]}&apikey=${movieKey}`
    );
    const { movie_2, movie_2_plot, movie_2_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[1]}&apikey=${movieKey}`
    );
    const { movie_3, movie_3_plot, movie_3_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[2]}&apikey=${movieKey}`
    );
    res.render("index", {
      movie_1: movie_1,
      movie_1_plot: movie_1_plot,
      movie_1_score: movie_1_score,
      movie_2: movie_2,
      movie_2_plot: movie_2_plot,
      movie_2_score: movie_2_score,
      movie_3: movie_3,
      movie_3_plot: movie_3_plot,
      movie_3_score: movie_3_score
    });
  } else if (weatherID > 699 && weatherID < 782) {
    // atmosphere (mist/fog) - apocalypse
    apocalypse.sort(() => {
      return 0.5 - Math.random();
    });
    const { movie_1, movie_1_plot, movie_1_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[0]}&apikey=${movieKey}`
    );
    const { movie_2, movie_2_plot, movie_2_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[1]}&apikey=${movieKey}`
    );
    const { movie_3, movie_3_plot, movie_3_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[2]}&apikey=${movieKey}`
    );
    res.render("index", {
      movie_1: movie_1,
      movie_1_plot: movie_1_plot,
      movie_1_score: movie_1_score,
      movie_2: movie_2,
      movie_2_plot: movie_2_plot,
      movie_2_score: movie_2_score,
      movie_3: movie_3,
      movie_3_plot: movie_3_plot,
      movie_3_score: movie_3_score
    });
  } else if (weatherID == 800) {
    // clear - comedy
    comedy.sort(() => {
      return 0.5 - Math.random();
    });
    const { movie_1, movie_1_plot, movie_1_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[0]}&apikey=${movieKey}`
    );
    const { movie_2, movie_2_plot, movie_2_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[1]}&apikey=${movieKey}`
    );
    const { movie_3, movie_3_plot, movie_3_score } = getMovieData(
      `http://www.omdbapi.com/?i=${documentary[2]}&apikey=${movieKey}`
    );
    res.render("index", {
      movie_1: movie_1,
      movie_1_plot: movie_1_plot,
      movie_1_score: movie_1_score,
      movie_2: movie_2,
      movie_2_plot: movie_2_plot,
      movie_2_score: movie_2_score,
      movie_3: movie_3,
      movie_3_plot: movie_3_plot,
      movie_3_score: movie_3_score
    });
  }
};
