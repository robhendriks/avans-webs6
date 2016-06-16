'use strict';

module.exports = function($http, UserFactory) {
  return {
    POST: function(gameId, callback) {
      
      var user = UserFactory.get();

      $http({
        method: 'POST',
        url: 'http://mahjongmayhem.herokuapp.com/Games/' + gameId + '/Players',
        data: game
      })
        .then(function(response) {
          callback(response.data);
        }, function(response) {
          callback(null);
        });

    }
  }
};
