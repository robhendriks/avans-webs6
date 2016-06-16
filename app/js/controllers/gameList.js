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

  $scope.init = function() {
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

  $scope.deleteGame = function(game) {
    for (var i = 0; i < $scope.games.length; i++) {
      if ($scope.games[i]._id === game._id) {
        $scope.games.splice(i, 1);
        return;
      }
    }
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
