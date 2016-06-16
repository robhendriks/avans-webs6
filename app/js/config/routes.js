'use strict';

module.exports = function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/games');
  $urlRouterProvider.when('/games/{gameId:[a-zA-Z0-9]{24,}}', '/games/{gameId}/board');

  $stateProvider
    .state('gameList', {
      url: '/games',
      views: {
        'ViewProfile': {
          templateUrl: 'partials/profile.html',
          controller: 'ProfileCtrl'
        },
        'ViewMaster': {
          templateUrl: 'partials/game.list.html',
          controller: 'GameListCtrl'
        },
        'ViewDetail': {
          templateUrl: 'partials/intro.html'
        }
      }
    })
    .state('gameList.gameCreate', {
      url: '/create',
      views: {
        'ViewDetail@': {
          templateUrl: 'partials/game.create.html',
          controller: 'GameCreateCtrl'
        }
      }
    })
    .state('gameList.gameDetails', {
      url: '/{gameId:[a-zA-Z0-9]{24,}}',
      views: {
        'ViewDetail@': {
          templateUrl: 'partials/game.details.html',
          controller: 'GameDetailsCtrl',
          resolve: {
            game: function($stateParams, GameFactory, UserFactory, $q) {
              var defer = $q.defer();
          
              GameFactory.GET($stateParams.gameId, function(game) {
                defer.resolve(game);
              });

              return defer.promise;
            }
          }
        }
      }
    })
    .state('gameList.gameDetails.board', {
      url: '/board',
      templateUrl: 'partials/game.board.html',
      controller: 'GameBoardCtrl'
    })
    .state('gameList.gameDetails.info', {
      url: '/info',
      templateUrl: 'partials/game.info.html',
      controller: 'GameInfoCtrl'
    })
    .state('gameList.gameDetails.users', {
      url: '/users',
      templateUrl: 'partials/game.users.html',
      controller: 'GameUserListCtrl'
    });
};
