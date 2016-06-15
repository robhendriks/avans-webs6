'use strict';

module.exports = function($scope, GameFactory, UserFactory) {
	$scope.user = null;
	$scope.games = [];

	$scope.state = null;
	$scope.user = false;

	var userid = null;

	$scope.init = function() {
		GameFactory.GET(function(games) {
			$scope.games = games;
		});

		UserFactory.me(function(id){
			userid = id['username'];
		});
	};

	$scope.filterState = function() {
		return $scope.state !== null;
	};

	$scope.filterOnUser = function(){
		if($scope.user){ $scope.user = false;}
		else{ $scope.user = true;}
	};

	$scope.userFilter = function(game){
		if($scope.user && userid != null){
			if(game['createdBy']['_id'] == userid){
				return game;
			}
			for(var i = 0; i < game['players'].length; i++) {
			    if(game['players'][i]['_id'] == userid){
			    	return game;	
			    }
			}
		}
		else {
			return game;
		}
	}

	$scope.init();
};
