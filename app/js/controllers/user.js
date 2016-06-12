'use strict';

module.exports = function($scope, $location) {
	$scope.user = null;
	
	console.log($location.search());

	$scope.hasUser = function() {
		return $scope.user !== null;
	};
};
