'use strict';

module.exports = function($scope, $state, UserFactory, GameFactory) {
  $scope.init = function() {
    $scope.working = false;
    $scope.user = UserFactory.get();
    $scope.game = $scope.$parent.game;
  };

  $scope.deleteGame = function() {
    $scope.working = true;
    GameFactory.DELETE($scope.game._id, function() {
      $scope.working = false;
      $state.go('gameList');
    });
  };

  $scope.init();
};
