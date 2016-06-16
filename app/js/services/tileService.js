'use strict';

module.exports = function($http) {
  
  return {

    getTilesByGameId: function(gameId, success, failure) {
      $http({
        method: 'GET',
        url: 'http://mahjongmayhem.herokuapp.com/Games/' + gameId + '/Tiles'
      }).then(success, failure);
    }

  }

};
