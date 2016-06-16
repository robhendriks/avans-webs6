'use strict';

module.exports = function($scope, $state, UserFactory, GameFactory) {
  $scope.user = null;
  $scope.game = null;
  $scope.tiles = [];

  $scope.init = function() {
    $scope.user = UserFactory.get();
    $scope.game = $scope.$parent.game;
  };

  $scope.init();
};
