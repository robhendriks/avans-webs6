'use strict';

module.exports = function($scope, game) {
  function init() {
    console.log(game);
    $scope.game = game;
  }

  init();
};
