var Leaderboard = {
  items: [],

  _leaderComparator: function (a, b) {
    return (a.wins - b.wins) - (a.losses - b.losses);
  },

  view: function (items) {
    leaderboardEl = $('.leaderboard__list');

    function populate() {
      // place into DOM
      $.each(items, function (index, item) {
        leaderboardEl.append(
          '<li class="' + (index === 0 ? 'is-in-lead' : '') + '">' +
            '<span class="leaderboard__name">' + item.name + '</span>' +
            '<span class="leaderboard__stats leaderboard__stats--wins">' + item.wins + '</span>' +
            '<span class="leaderboard__stats leaderboard__stats--losses">' + item.losses + '</span>' +
          '</li>'
        );
      });
    }

    return populate();
  },

  update: function (users) {
    // Sort leaderboard
    users = users.sort(this._leaderComparator);
    users.reverse();
    this.items = users;
    this.view(this.items);
  }
};

module.exports = Leaderboard;
