'use strict';

module.exports = function($http) {
  return {
    GET: function(gameId, callback) {

      $http({
        method: 'GET',
        url: 'http://mahjongmayhem.herokuapp.com/Games/' + gameId + '/Tiles'
      })
        .then(function(response) {
          callback(response.data);
        }, function(response) {
          callback(null);
        });

    },
  }
};
