'use strict';

var _ = require('underscore');

module.exports = function($scope, $state, UserFactory, TileFactory) {
  $scope.init = function() {
    $scope.game = $scope.$parent.game;
    if ($scope.game.state === 'open') {
      return $state.go('^.idle');
    }
  };

  $scope.init();
};
