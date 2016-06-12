'use strict';

module.exports = function($scope, GameFactory) {
	$scope.user = null;
	$scope.games = [];

	$scope.init = function() {
		GameFactory.GET(function(games) {
			$scope.games = games;
		});
	};

	$scope.init();
};
