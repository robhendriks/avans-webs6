'use strict';

module.exports = function($scope, game, user) {
  var self = $scope;

  self.game = game;
  self.user = user;

  self.inGame = function() {
    if (!self.game) { return false; }

    for (var i = 0; i < self.game.players.length; i++) {
      if (self.game.players[i]._id === self.user.username) {
        return true;
      }
    }
    return false;
  };

  console.log(self.inGame());
};
