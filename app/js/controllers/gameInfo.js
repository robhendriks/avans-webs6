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
      $state.go('gameList');
      
      $scope.$parent.$$prevSibling.reset();   
      $scope.$parent.$$prevSibling.loadGames();
    });
  };

  $scope.init();
};
