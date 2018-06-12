var request = require("request");
var authorization = require("./secrets.js");
var fs = require("fs");
args = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');

// Getting URL that contains contributors:
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

// Parsing the contributors string into an object.
    request(options, function(err, result, body) {
      var contributors = JSON.parse(body);
      cb(err, contributors);
    });
  }
}

// Calls getRepoCOontributors with command line arguments. In the callback function, the avatar url and file path are extracted from the  contributors object and passed into the downloadImageByURL function.
getRepoContributors(args[0], args[1], function(err, result) {
  console.log("Errors: ", err);
  for (var i = 0; i < result.length; i++) {
    var avatarURL = result[i].avatar_url;
    var path = result[i].login + ".png";
    downloadImageByURL(avatarURL, "./avatars/" + path);
  }
});

// Writes avatars into ./avatars
function downloadImageByURL(url, filePath) {
  request.get(url)
         .pipe(fs.createWriteStream(filePath))
}
