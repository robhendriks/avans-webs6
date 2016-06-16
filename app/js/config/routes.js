'use strict';

module.exports = function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/games');
  // $urlRouterProvider.when('/games/view/:gameId', '/games/view/:gameId/board');

  $stateProvider
    .state('games', {
      abstract: true,
      url: '/games',
      templateUrl: 'partials/game.list.html',
      controller: 'GameListCtrl'
    })
    .state('games.index', {
      url: '',
      templateUrl: 'partials/game.empty.html'
    })
    .state('games.create', {
      url: '/create',
      templateUrl: 'partials/game.create.html',
      controller: 'GameCreateCtrl'
    })
    .state('games.view', {
      url: '/view/:gameId',
      templateUrl: 'partials/game.view.html',
      controller: 'GameViewCtrl',
      resolve: {
        game: function($stateParams, $q, gameService) {
          var defer = $q.defer();

          gameService.getById($stateParams.gameId, function(err, game) {
            defer.resolve(game);
          });

          return defer.promise;
        }
      }
    });
};
