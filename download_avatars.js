var request = require("request");
var authorization = require("./secrets.js");
var fs = require("fs");

// console.log('Welcome to the GitHub Avatar Downloader!');

// function getRepoContributors(repoOwner, repoName, cb) {
//   var options = {
//     url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
//     headers: {
//       "User-Agent": "request"
//     }
//   };

//   request(options, function(err, result, body) {
//     var contributors = JSON.parse(body);
//     cb(err, contributors);
//   });
// }

// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors: ", err);
//   for (var i = 0; i < result.length; i++) {
//     console.log(result[i].avatar_url);
//   }
// });

function downloadImageByURL(url, filePath) {
  request.get(url)
         .pipe(fs.createWriteStream(filePath))
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./avatars/kvirani.jpg");