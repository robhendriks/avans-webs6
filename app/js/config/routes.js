'use strict';

module.exports = function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/games');
	$urlRouterProvider.when('/games/:gameId', '/games/:gameId/board');
	
	$stateProvider
		.state('gameList', {
			url: '/games',
			views: {
				'ViewProfile': {
					templateUrl: 'partials/profile.html',
					controller: 'ProfileCtrl'
				},
				'ViewMaster': {
					templateUrl: 'partials/game-list.html',
					controller: 'GameListCtrl'
				},
				'ViewDetail': {
					templateUrl: 'partials/intro.html'
				},
				'ViewAdd': {
					templateUrl: 'partials/game-add.html',
					controller: 'GameAddCtrl'
				}
			}
		})
		.state('gameList.gameDetails', {
			url: '/:gameId',
			views: {
				'ViewDetail@': {
					templateUrl: 'partials/game-details.html',
					controller: 'GameDetailsCtrl as g',
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
			templateUrl: 'partials/game-board.html'
		})
		.state('gameList.gameDetails.stats', {
			url: '/stats',
			templateUrl: 'partials/game-stats.html'
		})
		.state('gameList.gameDetails.users', {
			url: '/users',
			templateUrl: 'partials/game-users.html',
			controller: 'GameUserListCtrl',
			resolve: {
				game: function($stateParams, GameFactory, $q) {
					var defer = $q.defer();
					
					GameFactory.GET($stateParams.gameId, function(game) {
						defer.resolve(game);
					});

					return defer.promise;
				}
			}
		});
};
