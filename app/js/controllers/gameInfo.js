'use strict';

module.exports = function($scope, $state, UserFactory, GameFactory) {
  $scope.user = null;
  $scope.game = null;

  $scope.init = function() {
    $scope.user = UserFactory.get();
    $scope.game = $scope.$parent.game;
  };

  $scope.deleteGame = function() {
    GameFactory.DELETE($scope.game._id, function() {
      $scope.$parent.$$prevSibling.deleteGame($scope.game);
      $state.go('gameList');
    });
  };

  $scope.init();
};
