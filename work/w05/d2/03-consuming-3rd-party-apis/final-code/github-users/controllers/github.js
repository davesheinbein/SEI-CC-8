const request = require('request');
const rootURL = 'https://api.github.com/';

module.exports = {
  userDetails
};

function userDetails(req, res) {
  const username = req.query.username;
  if (!username) return res.render('index', {userData: null});
  const options = {
    url: rootURL + 'users/' + username,
    headers: {
      'User-Agent': 'jim-clark',
      'Authorization': 'token ' + process.env.GITHUB_TOKEN
    }
  };
  request(options, function(err, response, body) {
    const userData = JSON.parse(body);
    // update the options url to fetch the user's repos
    options.url = userData.repos_url;
    request(options, function(err, response, body) {
      // add a repos property
      try {
        userData.repos = JSON.parse(body);
        res.render('index', {userData});
      } catch {
        res.redirect('/');
      }
    });
  });
}
