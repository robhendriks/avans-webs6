'use strict';

module.exports = function($scope, game, GameFactory, $state) {
	$scope.game = game;

	$scope.joinGame = function(){
		GameFactory.JOIN(game['_id'], function(data){
			if(data['code'] == undefined){
				$state.go('gameList.gameDetails', {gameId: game['_id']})
			}
			else{
				alert(data['message']);
			}
		});
	}
};
