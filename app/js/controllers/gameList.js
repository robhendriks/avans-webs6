'use strict';

var _ = require('underscore');

var pageSize = 25;

module.exports = function($scope, GameFactory, UserFactory) {
  var initialized = false;

  $scope.user = null;
  $scope.games = [];

  $scope.states = [
    {id: 'open', text: 'Open'},
    {id: 'playing', text: 'Bezig'},
    {id: 'finished', text: 'Afgelopen'}
  ];
  $scope.page = 0;
  $scope.userOnly = false;
  $scope.state = null;
  $scope.loaded = false;
  $scope.hasMore = true;

  function gameRemoved(gameId) {
    var index = _.findIndex($scope.games, function(game) {
      return game._id === gameId;
    });
    if (index !== -1) { 
      $scope.games.splice(index, 1); 
    }
  }

  function gameAdded(game) {
    if ($scope.state === null || game.state === $scope.state.id) {
      $scope.games.splice(0, 0, game);
    }
  }

  $scope.init = function() {
    GameFactory.addEventListener('delete', gameRemoved);
    GameFactory.addEventListener('post', gameAdded);

    $scope.user = UserFactory.get();
    $scope.loadGames();
  };

  $scope.reset = function() {
    $scope.page = 0;
    $scope.games = [];
    $scope.hasMore = true;
  };

  $scope.loadGames = function() {
    $scope.loaded = false;

    GameFactory.GET({
      pageSize: pageSize,
      pageIndex: $scope.page,
      state: ($scope.state !== null) ? $scope.state.id : null,
      player: ($scope.userOnly && $scope.user !== null) ? $scope.user.username : null
    }, function(games) {
      if (!initialized) { initialized = true; }

      $scope.loaded = true;
      $scope.hasMore = (games.length >= pageSize);
      
      if ($scope.page > 0) {
        $scope.games = $scope.games.concat(games);
      } else {
        $scope.games = games;
      }
    });
  };

  $scope.loadMoreGames = function() {
    $scope.page++;
  };

  $scope.setState = function(index) {
    if (!$scope.loaded || index === $scope.state) {
      return;
    } else if (index < 0 || index > $scope.states.length) {
      $scope.state = null;
      return;
    }
    $scope.state = $scope.states[index];
  };

  $scope.hasJoined = function(game) {
    if (!$scope.user) { 
      return false; 
    }
    var index = _.findIndex(game.players, function(player) {
      return player._id === $scope.user.username;
    });
    return index !== -1;
  };

  $scope.$watchGroup(['state', 'userOnly'], function(oldValues, newValues) {
    if (!initialized) { return; }
    $scope.reset();
    $scope.loadGames();
  });

  $scope.$watch('page', function(oldValue, newValue) {
    if (!initialized) { return; }
    $scope.loadGames();
  });

  $scope.init();
};
