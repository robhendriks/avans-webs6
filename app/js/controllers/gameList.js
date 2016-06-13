'use strict';

module.exports = function($scope, GameFactory) {
	$scope.user = null;
	$scope.games = [];

	$scope.state = 'playing';

	$scope.init = function() {
		GameFactory.GET(function(games) {
			$scope.games = games;
		});
	};

	$scope.filterState = function() {
		return $scope.state !== null;
	};

	$scope.init();
};
