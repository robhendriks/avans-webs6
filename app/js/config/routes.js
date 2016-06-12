'use strict';

module.exports = function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/games');

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
						game: function($stateParams, GameFactory, $q) {
							var defer = $q.defer();
							
							GameFactory.GET($stateParams.gameId, function(game) {
								console.log(game);
								defer.resolve(game);
							});

							return defer.promise;
						}
					}
				}
			}
		});
};
