'use strict';

var _ = require('underscore');

module.exports = function($scope, $state, gameService, playerService, tileService) {

  function isOwner(player) {
    return $scope.game.createdBy._id === player._id;
  }

  function isMember(player) {
    for (var i = $scope.game.players.length - 1; i >= 0; i--) {
      if ($scope.game.players[i]._id === player._id) {
        return true;
      }
    }
    return false;
  }

  function init() {
    if ($scope.user !== null) {
      $scope.isOwner = isOwner({_id: $scope.user.username});
      $scope.isMember = isMember({_id: $scope.user.username});
    } else if ($scope.game.state === 'open') {
      return;
    }

    tileService.getTilesByGameId($scope.game._id, function(err, tiles) {
      if (!err && tiles) {
        $scope.tiles = tiles;
      }
    });
  }

  $scope.joinGame = function() {
    var player = {_id: $scope.user.username};
    if (isMember(player)) { return; }

    playerService.joinGameById($scope.game._id, function(err) {
      playerService.getPlayersByGameId($scope.game._id, function(err, players) {
        $scope.isMember = true;
        $scope.getGames(true);
      });
    });
  };

  $scope.startGame = function() {
    if ($scope.game.state !== 'open') { return; }
    playerService.startGameById($scope.game._id, function(err) {
      if (!err) { return; }
     $scope.getGames(true);
    });
  };

  $scope.deleteGame = function() {
    var game = $scope.game;
    gameService.deleteGame(game._id, function(err) {
      if (err) { return; }
      $scope.getGames(true);
      $state.go('games.index');
    });
  };

  init();
};
