'use strict';

var _ = require('underscore');

module.exports = function($scope, $state, UserFactory, GameFactory) {
  $scope.init = function() {
    $scope.game = $scope.$parent.game;
    $scope.user = UserFactory.get();
    $scope.working = false;

    if ($scope.game.state !== 'open') {
      return $state.go('^.board');
    }
  };

  $scope.deleteGame = function() {
    $scope.working = false;
    GameFactory.DELETE($scope.game._id, function() {
      $scope.working = true;
      $state.go('gameList');
    });
  };

  $scope.joinGame = function() {

  };

  $scope.canDeleteGame = function() {
    return false;
  };

  $scope.canJoinGame = function() {
    return false;
  };

  $scope.init();
};
