var $ = require('jquery');
global.jQuery = $;
global.$ = $;

var Leaderboard = require('./components/Leaderboard');
var UserService = require('./services/UserService');

var _users = [];

function fetchUsers() {
  UserService.fetch(function (users) {
    _users = users;
    Leaderboard.update(_users);
  });
}

$(document).ready(function () {
  setInterval(fetchUsers, 2000);
  fetchUsers();
});


