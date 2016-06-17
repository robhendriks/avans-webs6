'use strict';

module.exports = function($scope, $state) {
  $scope.txtValue = '';

  function init() {
    $scope.players = $scope.$parent.game.players;
  }

  init();

};
