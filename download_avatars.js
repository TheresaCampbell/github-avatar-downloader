var request = require("request");
var authorization = require("./secrets.js");
var fs = require("fs");
args = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  if (!repoName) {
    console.log("Please specify repo name.");
  } else {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        "User-Agent": "request"
      }
    };


    request(options, function(err, result, body) {
      var contributors = JSON.parse(body);
      cb(err, contributors);
    });
  }
}


getRepoContributors(args[0], args[1], function(err, result) {
  console.log("Errors: ", err);
  for (var i = 0; i < result.length; i++) {
    var avatarURL = result[i].avatar_url;
    var path = result[i].login + ".png";
    downloadImageByURL(avatarURL, "./avatars/" + path);
  }
});


function downloadImageByURL(url, filePath) {
  request.get(url)
         .pipe(fs.createWriteStream(filePath))
}
