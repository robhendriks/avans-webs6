'use strict';

module.exports = function($http) {
  
  return {

    getTilesByGameId: function(gameId, params, callback) {
      $http({
        method: 'GET',
        url: 'http://mahjongmayhem.herokuapp.com/Games/' + gameId + '/Tiles',
        params: params
      }).then(function(response) {
        callback(null, response.data);
      }, function() {
        callback(null, false);
      });
    }

  }

};
