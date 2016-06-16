'use strict';

module.exports = function($scope) {
  $scope.players = [];

  $scope.init = function() {
    $scope.players = $scope.$parent.game.players;
  };

  $scope.init();
};
