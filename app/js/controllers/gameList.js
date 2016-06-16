'use strict';

var _ = require('underscore');

module.exports = function($scope, userService, gameService) {
  var pageSize = 10;
  var pageIndex = 0;

  function getGames(reset) {
    if (reset === true) {
      $scope.games = [];
      pageIndex = 0;
    }

    $scope.loading = true;

    var options = {
      pageSize: pageSize,
      pageIndex: pageIndex,
      state: ($scope.selectedState !== null) ? $scope.selectedState.id : null,
      player: ($scope.filterUser !== false && $scope.user !== null) ? $scope.user.username : null
    };

    gameService.getGames(options, onGamesReceived);
  }

  function onGamesReceived(err, games) {
    $scope.loading = false;

    if (err || !games) {
      return;
    }

    $scope.nextPage = (games.length >= pageSize);
    $scope.games = (pageIndex != 0) ? $scope.games.concat(games) : games;
  } 

  function init() {
    $scope.user = userService.get();
    $scope.filterUser = false;

    $scope.states = [
      {id: 'open', text: 'Open'},
      {id: 'playing', text: 'Bezig'},
      {id: 'finished', text: 'Afgelopen'}
    ];
    $scope.selectedState = null;

    getGames();
  };

  $scope.addGame = function(game) {
    $scope.games.splice(0, 0, game);
  };

  $scope.getMoreGames = function() {
    pageIndex++;
    getGames();
  };

  $scope.setState = function(state) {
    if (state === $scope.selectedState) { return; }
    $scope.selectedState = state;
    getGames(true);
  };

  $scope.isState = function(state) {
    return $scope.selectedState === state;
  }

  $scope.$watch('filterUser', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      getGames(true);
    }
  });

  init();
};
