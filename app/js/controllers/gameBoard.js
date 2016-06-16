'use strict';

var _ = require('underscore');

module.exports = function($scope, $state, UserFactory, TileFactory) {
  $scope.init = function() {
    $scope.user = UserFactory.get();
    $scope.game = $scope.$parent.game;
  };

  $scope.init();
};
