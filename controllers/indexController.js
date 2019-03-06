const expressip = require("express-ip");

// display homepage
exports.index = function(req, res) {
  // get user location and the weather at location in sequence using async
  const ip = req.ipInfo;
  console.log(`"CITY ${ip.city} REGION ${ip.country}"`)
  res.render("index", { title: "Movie Suggestions" });
};
