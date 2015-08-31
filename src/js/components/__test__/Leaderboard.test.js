var assert = require("assert");
var jsdom = require('node-jsdom');

var Leaderboard = require("../Leaderboard");

describe('Leaderboard', function () {

  beforeEach(function () {
    // setup jsdom and jquery
    var doc = jsdom.jsdom("<html><body><ol class='leaderboard__list'></ol></body></html>");
    var window = doc.parentWindow;
    var $ = global.$ = require('jquery')(window);
  })

  describe('#_leaderComparator', function () {

    it('should compare two user results correctly', function () {
      assert.equal(
        0,
        Leaderboard._leaderComparator(
          {wins: 0, losses: 10},
          {wins: 0, losses: 10}
        )
      );

      assert.equal(
        13,
        Leaderboard._leaderComparator(
          {wins: 9, losses: 1},
          {wins: 5, losses: 10}
        )
      );

      assert.equal(
        -2,
        Leaderboard._leaderComparator(
          {wins: 4, losses: 2},
          {wins: 8, losses: 4}
        )
      );
    });

    it('should return NaN with malformed objects', function () {
      assert.equal(
        true,
        isNaN(Leaderboard._leaderComparator(
          {weeens: 4, losses: 2},
          {wins: 8, losses: 4}
        ))
      );
    });

  });


  describe('#view', function () {

    it('should not list users before being called', function () {
      assert.equal(0, $('.leaderboard__list li').length);
    });

    it('should list two users correctly in the dom', function () {
      Leaderboard.view([
        {name: 'YaY', wins: 8, losses: 4},
        {name: 'NoN', wins: 8, losses: 4}
      ]);

      assert.equal(2, $('.leaderboard__list li').length);
    });

    it('should list 0 users correctly in the dom', function () {
      Leaderboard.view([]);

      assert.equal(0, $('.leaderboard__list li').length);
    });

  });

});
