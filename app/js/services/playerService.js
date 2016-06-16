'use strict';

module.exports = function($http) {
  return {

    joinGameById: function(gameId, success, failure) {
      $http({
        method: 'POST',
        url: 'http://mahjongmayhem.herokuapp.com/Games/' + gameId + '/Players'
      }).then(success, failure);
    }

  }
};
