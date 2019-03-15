const async = require("async");
const fetch = require("node-fetch");

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

const getMovieData = async url => {
  try {
    const title0 = await getMovieTitle(url[0]);
    const plot0 = await getMoviePlot(url[0]);
    const score0 = await getMovieScore(url[0]);
    const title1 = await getMovieTitle(url[1]);
    const plot1 = await getMoviePlot(url[1]);
    const score1 = await getMovieScore(url[1]);
    const title2 = await getMovieTitle(url[2]);
    const plot2 = await getMoviePlot(url[2]);
    const score2 = await getMovieScore(url[2]);
    return {
      title0,
      plot0,
      score0,
      title1,
      plot1,
      score1,
      title2,
      plot2,
      score2
    };
  } catch (err) {
    console.log(err);
  }
};

const movieKey = "43f46c28";

const documentary = [
  "tt1772925",
  "tt0317910",
  "tt3518012",
  "tt4044364",
  "tt0110057",
  "tt1559549",
  "tt3578504"
];

const url = [
  `http://www.omdbapi.com/?i=${documentary[0]}&apikey=${movieKey}`,
  `http://www.omdbapi.com/?i=${documentary[1]}&apikey=${movieKey}`,
  `http://www.omdbapi.com/?i=${documentary[2]}&apikey=${movieKey}`
];

const movieSelections = getMovieData(url);
movieSelections.then(function(result) {
  const {
    title0,
    plot0,
    score0,
    title1,
    plot1,
    score1,
    title2,
    plot2,
    score2
  } = result;
  console.log(title0);
  console.log(title1);
  console.log(title2);
});
