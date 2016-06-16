'use strict';

var _ = require('underscore');

module.exports = function($scope, $state, gameService, playerService) {

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
    }
  }

  function removeGameFromList(game) {
    for (var i = $scope.games.length - 1; i >= 0; i--) {
      if ($scope.games[i]._id === game._id) {
        $scope.games.splice(i, 1);
        break;
      }
    }
    $state.go('games.index');
  }

  $scope.joinGame = function() {
    var player = {_id: $scope.user.username};
    if (isMember(player)) { return; }

    playerService.joinGameById($scope.game._id, function(err) {
      playerService.getPlayersByGameId($scope.game._id, function(err, players) {
        $scope.isMember = true;
        $scope.game.players = players;
      });
    });
  };

  $scope.startGame = function() {
    if ($scope.game.state !== 'open') { return; }
    playerService.startGameById($scope.game._id, function(err) {
      if (!err) { return; }
      $scope.game.state = 'playing';  
      if ($scope.selectedState !== null && $scope.selectedState.id !== $scope.game.state) {
        removeGameFromList($scope.game);
      }
    });
  };

  $scope.deleteGame = function() {
    var game = $scope.game;
    gameService.deleteGame(game._id, function(err) {
      if (err) { return; }
      removeGameFromList(game);
    });
  };

  init();
};
