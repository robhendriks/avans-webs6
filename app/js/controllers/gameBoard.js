'use strict';

var _ = require('underscore');

module.exports = function($scope, $state, gameService, playerService, tileService) {

  var socket = null;
  var selection = {
    one: undefined, 
    two: undefined
  };
  var matching = false;

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

  function onStart() {
    $scope.getGames(true);
    $state.go('games.view', {gameId: $scope.game._id}, {reload: true});
  }

  function onEnd() {
    $scope.getGames(true);
    $state.go('games.view', {gameId: $scope.game._id}, {reload: true});

    alert('Spel afgelopen!');
  }

  function onPlayerJoined(player) {
    $scope.game.players.push(player);
    $scope.$apply();
  }

  function onMatch(matches) {
    removeTiles([matches[0]._id, matches[1]._id]);
    $scope.$apply();
  }

  function init() {
    socket = io('http://mahjongmayhem.herokuapp.com?gameId=' + $scope.game._id);

    socket.on('start', onStart);
    socket.on('end', onEnd);
    socket.on('playerJoined', onPlayerJoined);
    socket.on('match', onMatch);

    if ($scope.user !== null) {
      $scope.isOwner = isOwner({_id: $scope.user.username});
      $scope.isMember = isMember({_id: $scope.user.username});
    } else if ($scope.game.state === 'open') {
      return;
    }

    tileService.getTilesByGameId(
      $scope.game._id, {matched: false}, function(err, tiles) {
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
        $scope.getGames(true);
        $scope.isMember = true;
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

  function removeTiles(tileIds) {
    for (var i = tileIds.length - 1; i >= 0; i--) {
      for (var j = $scope.tiles.length - 1; j >= 0; j--) {
        if ($scope.tiles[j]._id === tileIds[i]) {
          $scope.tiles.splice(j, 1);
        }
      }
    }
  }

  $scope.selectTile = function(tileId) {
    if (matching) { return; }
    else if (!$scope.isMember) {
      alert('Alleen kijken niet aanraken ;)');
      return;
    }

    if (selection.one === undefined) {
      selection.one = tileId;
    } else if (selection.two === undefined) {
      selection.two = tileId;

      var tiles = {
        tile1Id: selection.one,
        tile2Id: selection.two
      };

      matching = true;

      playerService.matchForGameId($scope.game._id, tiles, function(err, data) {
        if (err) {
          alert(err.message);
        }
        selection.one = selection.two = undefined;
        matching = false;
      })
    }
  };

  init();
};
