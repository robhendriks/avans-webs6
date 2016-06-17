'use strict';

module.exports = function($http) {
  return {
    getGames: function(params, callback) {
      $http({
        method: 'GET',
        url: 'http://mahjongmayhem.herokuapp.com/Games',
        params: params
      })
        .then(function(response) {
          callback(null, response.data);
        }, function() {
          callback(null, false);
        });
    },

    getById: function(gameId, callback) {
      $http({
        method: 'GET',
        url: 'http://mahjongmayhem.herokuapp.com/Games/' + gameId
      }).then(function(response) {
        callback(null, response.data);
      }, function() {
        callback(null, false);
      });
    },

    createGame: function(newGame, callback) {
      $http({
        method: 'POST',
        url: 'http://mahjongmayhem.herokuapp.com/Games',
        data: newGame
      })
        .then(function(response) {
          callback(null, response.data);
        }, function() {
          callback(null, false);
        });
    },

    deleteGame: function(gameId, callback) {
      $http({
        method: 'DELETE',
        url: 'http://mahjongmayhem.herokuapp.com/Games/' + gameId
      })
        .then(function(response) {
          callback(null, response.data);
        }, function() {
          callback(null, false);
        });
    }
  };
};
