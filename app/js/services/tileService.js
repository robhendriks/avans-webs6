'use strict';

module.exports = function($http) {
  
  return {

    getTilesByGameId: function(gameId, callback) {
      $http({
        method: 'GET',
        url: 'http://mahjongmayhem.herokuapp.com/Games/' + gameId + '/Tiles'
      }).then(function(response) {
        callback(null, response.data);
      }, function() {
        callback(null, false);
      });
    }

  }

};
