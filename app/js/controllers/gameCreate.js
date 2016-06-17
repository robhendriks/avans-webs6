'use strict';

module.exports = function($scope, $state, templateService, gameService) {
  // $scope.submit = function(isValid) {
  //   if (!isValid) {
  //     return;
  //   }

  //   $scope.working = true;
  //   GameFactory.POST({
  //     templateName: $scope.selectedTemplate._id,
  //     minPlayers: $scope.minPlayers,
  //     maxPlayers: $scope.maxPlayers
  //   }, function(game) {
  //     if (game) {
  //       $scope.working = false;
  //       $state.go('gameList.gameDetails', {gameId: game._id});  
  //     }
  //   });

  // };

  // $scope.init();

  function getTemplates() {
    templateService.getTemplates(function(err, templates) {
      if (!err && templates && templates.length > 0) {
        $scope.templates = templates;
        $scope.selectedTemplate = templates[0];
      }
    });
  }

  function init() {
    $scope.loading = false;

    $scope.selectedTemplate = null;
    $scope.minPlayers = 2;
    $scope.maxPlayers = 32;

    getTemplates();
  }

  $scope.submit = function(isValid) {
    if (!isValid) { return; }
    $scope.loading = true;

    var game = {
      templateName: ($scope.selectedTemplate !== null) ? $scope.selectedTemplate._id : 'Ox',
      minPlayers: $scope.minPlayers || 2,
      maxPlayers: $scope.maxPlayers || 32
    };

    gameService.createGame(game, function(err, newGame) {
      $scope.loading = false;

      if (!err && newGame) {
        $scope.$parent.addGame(newGame);
        $state.go('games.view', {gameId: newGame._id});
      }
    });
  };

  init();
};
