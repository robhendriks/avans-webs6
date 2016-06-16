'use strict';

var _ = require('underscore');

module.exports = function($scope, $state, userService, GameFactory) {
  var self = this;

  function isOwner(player) {
    return $scope.game.createdBy._id === player.username;
  }

  function isInGame(player) {
    return false;
  }

  self.init = function() {
    $scope.user = userService.get();
    $scope.game = $scope.$parent.game;

    $scope.isOwner = isOwner($scope.user);
    $scope.isInGame = isInGame($scope.user);

    $scope.canJoin = ($scope.game.state === 'open' && !$scope.isOwner && !$scope.isInGame);
    $scope.canDelete = ($scope.game.state === 'open' && $scope.isOwner);

    console.log('da');
  }

  $scope.deleteGame = function() {
    $scope.working = false;
    GameFactory.DELETE($scope.game._id, function() {
      $scope.working = true;
      $state.go('gameList');
    });
  };

  self.init();
};
