'use strict';

module.exports = function(GameFactory, $state, $scope) {

	// Form Properties
	$scope.gameTemplate = null;
	$scope.minPlayers = 2;
	$scope.maxPlayers = 32;

	$scope.gameTemplates = null;

	$scope.init = function(){
		GameFactory.GETTEMPLATES(function(data){
			if(data != null){
				$scope.gameTemplates = data;
			}
		});
	};

	$scope.submit = function(){
		if($scope.gameTemplate != null){
			GameFactory.ADD($scope.gameTemplate, $scope.minPlayers, $scope.maxPlayers, function(data){
				$state.go('gameList.gameDetails', {gameId: data['_id']})
				$scope.gameTemplate = null;
				$scope.minPlayers = 2;
				$scope.maxPlayers = 32;
			});
		}
		else{
			alert('Er is geen template geselecteerd!');
		}
	};

	$scope.init();
};
 