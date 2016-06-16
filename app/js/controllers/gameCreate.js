'use strict';

module.exports = function($scope, $state, TemplateFactory, GameFactory) {
  $scope.working = false;
  $scope.templates = [];
  $scope.selectedTemplate = null;
  $scope.minPlayers = 2;
  $scope.maxPlayers = 32;

  $scope.init = function() {
    TemplateFactory.GET(function(templates) {
      $scope.templates = templates;
      $scope.selectedTemplate = templates[0];
    });
  };

  $scope.submit = function(isValid) {
    if (!isValid) {
      return;
    }

    $scope.working = true;
    GameFactory.POST({
      templateName: $scope.selectedTemplate._id,
      minPlayers: $scope.minPlayers,
      maxPlayers: $scope.maxPlayers
    }, function(game) {
      if (game) {
        $scope.working = false;

        $scope.$$prevSibling.reset();   
        $scope.$$prevSibling.loadGames();

        $state.go('gameList.gameDetails', {gameId: game._id});  
      }
    });

  };

  $scope.init();
};
