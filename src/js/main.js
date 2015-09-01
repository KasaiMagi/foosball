'use strict';

var usersJson = [
  {
    "id": 0,
    "name": "PG",
    "wins": 1,
    "losses": 7
  },
  {
    "id": 1,
    "name": "Michael",
    "wins": 3,
    "losses": 17
  },
  {
    "id": 2,
    "name": "John",
    "wins": 12,
    "losses": 2
  },
  {
    "id": 3,
    "name": "Ferdi",
    "wins": 14,
    "losses": 4
  },
  {
    "id": 4,
    "name": "Ben",
    "wins": 15,
    "losses": 13
  },
  {
    "id": 5,
    "name": "Felix",
    "wins": 19,
    "losses": 5
  },
  {
    "id": 6,
    "name": "Philip",
    "wins": 3,
    "losses": 15
  },
  {
    "id": 7,
    "name": "Rafael",
    "wins": 20,
    "losses": 15
  },
  {
    "id": 8,
    "name": "Shawn",
    "wins": 18,
    "losses": 4
  },
  {
    "id": 9,
    "name": "Collin",
    "wins": 11,
    "losses": 0
  },
  {
    "id": 10,
    "name": "George",
    "wins": 16,
    "losses": 12
  },
  {
    "id": 11,
    "name": "Jason",
    "wins": 20,
    "losses": 2
  },
  {
    "id": 12,
    "name": "Jose",
    "wins": 6,
    "losses": 15
  },
  {
    "id": 13,
    "name": "Joris",
    "wins": 18,
    "losses": 15
  }
];

var app = function() {

  // init models
  var users = [];

  var renderLeaderboard = function(el, template, users) {
    var listContainer = el.querySelector('.leaderboard__list');

    users.forEach(function(user, index) {
      var listItem = document.importNode(template.content, true);
      listItem.querySelector('.leaderboard__name').textContent = user.name;
      listItem.querySelector('.leaderboard__stats--wins').textContent = user.wins;
      listItem.querySelector('.leaderboard__stats--losses').textContent = user.losses;

      if (index === 0) {
        listItem.querySelector('li').className = 'is-in-lead selected';
      }

      listContainer.appendChild(listItem);
    });
  };

  var render = function(el, templates) {
    renderLeaderboard(el.querySelector('.leaderboard'), templates.leaderboardUser, users);
  };

  var initInteraction = function(el) {
    var selectedIndex = 0;

    var getSelectedUser = function() {
      return users[selectedIndex];
    };

    var onKeyDown = function(event) {
      var keyBindings = {
        38: function() {
          if (selectedIndex > 0) {
            selectedIndex--;
            console.log('selected user:', getSelectedUser());
          }
        },
        40: function() {
          if (users[selectedIndex + 1]) {
            selectedIndex++;
            console.log('selected user:', getSelectedUser());
          }
        }
      };

      if (keyBindings[event.keyCode]) {
        keyBindings[event.keyCode]();
      }
    };

    el.addEventListener('keydown', onKeyDown);
  };

  var init = function(parentEl) {
    var createUser = function(data) {
      return {
        id: data.id,
        name: data.name,
        wins: data.wins,
        losses: data.losses
      };
    };

    var loadData = function() {
      users = usersJson.map(createUser);
      users.sort(function(a, b) {
        if (a.wins === b.wins) {
          return 0;
        }

        return a.wins > b.wins ? -1 : 1;
      });
    };

    var templates = {
      leaderboardUser: parentEl.querySelector('#leaderboarduser')
    };

    loadData();
    render(parentEl, templates);
    initInteraction(parentEl);
  };

  return {
    init: init
  };
}();

document.addEventListener('DOMContentLoaded', function(event) {
  app.init(document);
});
