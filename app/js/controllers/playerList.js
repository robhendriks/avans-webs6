'use strict';

module.exports = function($scope, $state) {
  
  function init() {
    $scope.players = $scope.$parent.game.players;
  }

  init();

};
